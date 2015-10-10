export {Wove, Metadata, MethodMetadata} from './src/core';
export {MemberPrecondition} from './src/joint_points';

import {BeforeAdvice, AroundAdvice, AfterAdvice, OnThrowAdvice} from './src/advices';
import {makeMethodCallAdviceDecorator} from './src/joint_points';
import {makeFieldGetAdviceDecorator, makeFieldSetAdviceDecorator} from './src/joint_points';

export let beforeMethod = makeMethodCallAdviceDecorator(BeforeAdvice);
export let afterMethod = makeMethodCallAdviceDecorator(AfterAdvice);
export let aroundMethod = makeMethodCallAdviceDecorator(AroundAdvice);
export let onThrowOfMethod = makeMethodCallAdviceDecorator(OnThrowAdvice);

export let beforeSetter = makeFieldSetAdviceDecorator(BeforeAdvice);
export let afterSetter = makeFieldSetAdviceDecorator(AfterAdvice);
export let aroundSetter = makeFieldSetAdviceDecorator(AroundAdvice);
export let onThrowOfSetter = makeFieldSetAdviceDecorator(OnThrowAdvice);

export let beforeGetter = makeFieldGetAdviceDecorator(BeforeAdvice);
export let afterGetter = makeFieldGetAdviceDecorator(AfterAdvice);
export let aroundGetter = makeFieldGetAdviceDecorator(AroundAdvice);
export let onThrowOfGetter = makeFieldGetAdviceDecorator(OnThrowAdvice);
