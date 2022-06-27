import { App } from 'cdk8s'
import { ProductionChart } from './config/production'
import { FeatureBranchChart } from './config/featureBranch'

const isFeatureBranch = process.env.DEPLOY_TO_FEATURE_BRANCH == 'true';
const app = new App();
isFeatureBranch ? new FeatureBranchChart(app) : new ProductionChart(app);
app.synth();