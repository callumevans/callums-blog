---
date: "2018-12-27"
title: "Attempting sane testing"
description: "I remember writing my first ever unit tests at my first job. Unfortunately, I decided to write some of the most useless tests you've ever seen."
---
I remember writing my earliest unit tests at my first job. I had to add some basic CRUD endpoints to an ASP application. It was the first bit of code I'd ever been paid to write and, as a graduate developer (albeit one with the gift of an overpowering sexual charisma), I was keen to leave a good first impression. Unfortunately, instead of demonstrating an ironclad grasp of my craft, I decided to insert my brain into my rectum and subsequently shit-out some of the most useless tests you've ever seen. I can't remember exactly what I'd written but they were something hilariously pointless. Like asserting that a value I'd specified a mock to return was, in fact, the value that the mock returned.

I spent probably a day or two writing similar tests—ones that could never fail—before I'd realised what I'd done. Sheepishly, I deleted everything and wrote new tests that made an effort to actually catch some bugs. It's a funny memory I have of my first few weeks as a developer and one that I reflect on quite often, if only to laugh and
see how much my thinking and approaches have since changed. Those 'improved' tests that I wrote, with each component of each layer of the application having its dependencies mocked and asserting calls and inputs between them in isolation, became my basic template for writing tests in other projects.

And yet, very recently I've concluded that almost all the tests I've ever written have been frail, ineffective baggage that could never be useful to anyone other than as typing-practice or a _how-not-to_ guide.

A lot of the programming I do centres around Web APIs; mostly straightforward CRUD stuff, usually in ASP Core. It was always an uphill struggle trying to write good tests for these applications. I always used to write tests that verified plumbing and implementation. And every time the implementation changed, the tests needed to change too. Double the maintenance overhead, and no guarantee that you've not broken anything. Nasty, brittle and pointless. Sadly, these types of tests are surprisingly common. If the following looks like something you might run into in your day-to-day work then you're running into the same problems that I was:

```csharp
public class MathsControllerTests
{
    private readonly Mock<IMathsService> mathsServiceMock;
    private readonly MathsController controller;

    public MathsControllerTests()
    {
        mathsServiceMock = new Mock<IMathsService>();
        controller = new MathsController(mathsServiceMock.Object);
    }

    [Fact]
    public void Add_ShouldCallAddService()
    {
        // Act
        controller.Get(10, 15);

        // Assert
        mathsServiceMock
            .Verify(x => x.Add(10, 15));
    }

    [Fact]
    public void Add_ReturnsResultFromService()
    {
        // Arrange
        mathsServiceMock
            .Setup(x => x.Add(10, 15))
            .Returns(999);

        // Act
        int result = controller.Get(10, 15);

        // Assert
        Assert.Equal(999, result);
    }
}

public class MathsServiceTests
{
    private readonly MathsService service = new MathsService();

    [Theory]
    [InlineData(10, 20, 30)]
    [InlineData(1, 2, 3)]
    public void Add_AddsTwoNumbers(int a, int b, int expected)
    {
        // Act
        int result = service.Add(a, b);

        // Assert
        Assert.Equal(expected, result);
    }
}
```

This is the approach taught to me, and is what many developers I have worked with use to test. This example demonstrates what I've come to understand as a highly insidious interpretation of the term _Unit Testing_, wherein a _unit_ is a minimal scope of code rather than behaviour. In my view, it's that very disparity that leads to the writing of many of the copiously crippled tests that are far more burdensome than beneficial.

Much better would be to simply write tests for the behaviours we want from the get-go. But isn't that what the example shows? We've isolated the behaviours of some units (our controllers and services) and written test fixtures for them. Actually, we've defined _unit_ in a counterproductive way.

What if our application's units were its behaviours? A lot of our problems go away when we use this interpretation. Referring to the example above, which tests a hypothetical API, we could summarise its one behaviour: "_Calling the GET route should return the result of two numeric arguments, passed via the query string, added together_". If we want to write tests for this behaviour in ASP Core, we could use its excellent [integration test tooling](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-2.2).

Let's see what one such test looks like:

```csharp
public class AddBehaviourTests : IClassFixture<WebApplicationFactory<Startup>>
{
    private readonly WebApplicationFactory<Startup> _factory;

    public AddBehaviourTests(WebApplicationFactory<Startup> factory)
    {
        _factory = factory;
    }

    [Theory]
    [InlineData(1, 2, 3)]
    [InlineData(0, 5, 5)]
    [InlineData(12, 11, 23)]
    public async Task Get_AddTwoNumbers_ReturnsResultOfAddingTwoNumbers(
        int a, int b, int expected)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync($"/maths/add?a={a}&b={b}");

        // Assert
        var result = await response.Content.ReadAsStringAsync();

        Assert.Equal(expected, int.Parse(result));
    }
}
```

This is so simple and I absolutely love it. In a single, far more robust test we've covered the same functionality that our other three, mock-heavy tests have. This code spins up the API and fires off an actual request to the endpoint. We didn't need a single mock. We've written less code that needs no future maintenance to do the same thing. We also get the added benefit of being able to test that the API can actually handle the request; if model bindings for our route weren't configured or some dependencies weren't registered with the ASP service provider correctly these tests will tell you. They're still fast enough to allow for continuous re-running, and you can step into and debug them just fine.

Of course, you could simply test the `MathsController` and inject a concrete `MathsService`, though the benefits of full end-to-end tests are numerous enough that they're worthwhile. We're completely decoupled from our implementation. If we want to remove `MathsService` altogether and bring the logic to the controller then so long as the tests don't break we know we haven't broken anything! 

Since we've largely removed the need to mock things, we can cut out a lot of awkward boilerplate work that requires us to add stupid interfaces to everything. Goodbye `IMathsService`! It's worth mentioning that, if you absolutely need to mock something, there exist alternative approaches, even without this whacked-out interface-based mocking method. [Pose](https://github.com/tonerdo/pose), [Virtuosity](https://github.com/Fody/Virtuosity) or even simply using `virtual` modifiers might all be better ideas than creating one-to-one interfaces for everything.

Entity Framework Core also integrates excellently with this approach, allowing you to easily swap out your actual data provider for an in-memory one with seeded data. In fact, we can override any of our services configured in `Startup`, just for our test-suite. It's a really, really awesome way of testing.

There are caveats, however. It can be more difficult to understand exactly what's going on, and you're juggling ASP's testing framework alongside xUnit so there are simply more places you can go wrong.

Nonetheless, when I began approaching tests like this a lot of things immediately 'clicked'. It was ultimately my move towards Test Driven Development that spurred this revelation for me; it provoked a lot of consideration about what and how I was actually trying to test, and encouraged me to try to understand _why_ tests were useful. Around the time I left my first job and my hauntingly shitty tests behind, I'd tried to adopt a TDD approach for most of the things I was coding. This worked wonderfully well for libraries, but I struggled to get value out of fitting it into my typical web API workflow. When I allowed myself to be okay with testing an application's requirements and behaviour first and simply ignored some of the distinctions between unit, integration and end-to-end testing, I felt as though I had finally started accessing some of the real benefit to having a solid suite of tests that give you actual, empowering confidence.

One might find some benefit in questioning the difference between unit and integration tests. At face-value, it seems reasonable to separate out these apparently distinct types of tests. But try asking people for consistent or meaningful definitions of the two and you're likely to run into some curious inconsistencies: "_Integration tests are when you're testing more than one class_", "_Integration tests cross module boundaries_", "_Integration tests talk to real systems_", "_Integration tests are slow_", "_Integration tests are not deterministic_". This might become problematic when you come across ideas that consider integration tests to be something unto themselves.

<blockquote class="twitter-tweet" data-lang="en">
    <p lang="en" dir="ltr">Write tests. Not too many. Mostly integration.</p>&mdash; Guillermo Rauch (@rauchg)
    <a href="https://twitter.com/rauchg/status/807626710350839808?ref_src=twsrc%5Etfw">December 10, 2016</a>
</blockquote>

It's not necessarily bad advice, but without context and clarification of terminology there are too many blanks for you to fill in. I've found such language to ultimately hinder more than help. Instead, the goal should be to have fast, reliable tests that give you confidence in your code, and you can call them whatever you want. If you find the categorisation of unit vs. integration useful, go for it; I've struggled to do so, and it was a relief to give myself permission to ignore it.

Martin Fowler has an excellent [post](https://martinfowler.com/bliki/UnitTest.html) that helps break out some of the pros and cons of sociable vs. solitary (classicist vs. mockist) tests.
