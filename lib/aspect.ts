import {MethodSelector, MemberSelector} from './src/joint_points/selectors';
import {BeforeAdvice, AroundAdvice, AfterAdvice, OnThrowAdvice} from './src/advices';
import {makeMethodCallAdviceDecorator, makeStaticMethodAdviceDecorator} from './src/joint_points';
import {makeFieldGetAdviceDecorator, makeFieldSetAdviceDecorator} from './src/joint_points';

export {Wove, Metadata, MethodMetadata, AspectRegistry as _AspectRegistry, Targets as _Targets} from './src/core';
export {MemberPrecondition} from './src/joint_points';

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

export let beforeStaticMethod = makeStaticMethodAdviceDecorator(BeforeAdvice);
export let afterStaticMethod = makeStaticMethodAdviceDecorator(AfterAdvice);
export let aroundStaticMethod = makeStaticMethodAdviceDecorator(AroundAdvice);
export let onThrowOfStaticMethod = makeStaticMethodAdviceDecorator(OnThrowAdvice);

