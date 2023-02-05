import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines'
import { CDKPipelineAppStage } from './cdk-pipeline-app-stage'

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

		const pipeline = new CodePipeline(this,'Pipeline',{
			pipelineName: 'MyPipeline',
			synth: new ShellStep('Synth', {
				input: CodePipelineSource.gitHub('andrewtdunn/cdk-pipeline', 'main'),
				commands: ['npm ci', 'npm run build', 'npx cdk synth']
			})
		} )

		const testingStage = pipeline.addStage(new CDKPipelineAppStage(this, 'test', {
			env: { account: '742383987475', region: 'us-east-1'}
		}))

		testingStage.addPost(new ManualApprovalStep('approval'))
  }
}
