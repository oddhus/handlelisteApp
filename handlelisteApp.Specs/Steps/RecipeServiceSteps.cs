using System;
using TechTalk.SpecFlow;

namespace handlelisteApp.Specs.Steps
{
    [Binding]
    public class RecipeServiceSteps
    {

        private readonly ScenarioContext _scenarioContext;

        public RecipeServiceSteps(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;
        }


        [Given(@"I provide an item to the ServiceController")]
        public void GivenIProvideAnItemToTheServiceController()
        {
            _scenarioContext.Pending();
        }
        
        [When(@"I get a result")]
        public void WhenIGetAResult()
        {
            _scenarioContext.Pending();
        }
        
        [Then(@"the result should contain recipes using that item and only those recipes")]
        public void ThenTheResultShouldContainRecipesUsingThatItemAndOnlyThoseRecipes()
        {
            _scenarioContext.Pending();
        }
    }
}
