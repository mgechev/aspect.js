export {Wove, Metadata, MethodMetadata} from './src/core';
export {MemberPrecondition} from './src/joint_points';

import {BeforeAdvice, AroundAdvice, AfterAdvice, OnThrowAdvice} from './src/advices';
import {makeMethodCallAdviceDecorator} from './src/joint_points';

export let before = makeMethodCallAdviceDecorator(BeforeAdvice);
export let after = makeMethodCallAdviceDecorator(AfterAdvice);
export let around = makeMethodCallAdviceDecorator(AroundAdvice);
export let onThrow = makeMethodCallAdviceDecorator(OnThrowAdvice);
