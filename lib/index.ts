import { MethodSelector, PropertySelector } from './src/join_points/selectors';
import { BeforeAdvice, AroundAdvice, AfterAdvice, OnThrowAdvice, AsyncOnThrowAdvice } from './src/advices';
import { makeMethodCallAdviceDecorator, makeStaticMethodAdviceDecorator } from './src/join_points';
import { makeFieldGetAdviceDecorator, makeFieldSetAdviceDecorator } from './src/join_points';

export { Wove, Metadata, MethodMetadata, AspectRegistry as _AspectRegistry, Targets as _Targets } from './src/core';
export { MemberPrecondition } from './src/join_points';

export const beforeMethod = makeMethodCallAdviceDecorator(BeforeAdvice);
export const afterMethod = makeMethodCallAdviceDecorator(AfterAdvice);
export const aroundMethod = makeMethodCallAdviceDecorator(AroundAdvice);
export const onThrowOfMethod = makeMethodCallAdviceDecorator(OnThrowAdvice);

export const beforeSetter = makeFieldSetAdviceDecorator(BeforeAdvice);
export const afterSetter = makeFieldSetAdviceDecorator(AfterAdvice);
export const aroundSetter = makeFieldSetAdviceDecorator(AroundAdvice);
export const onThrowOfSetter = makeFieldSetAdviceDecorator(OnThrowAdvice);

export const beforeGetter = makeFieldGetAdviceDecorator(BeforeAdvice);
export const afterGetter = makeFieldGetAdviceDecorator(AfterAdvice);
export const aroundGetter = makeFieldGetAdviceDecorator(AroundAdvice);
export const onThrowOfGetter = makeFieldGetAdviceDecorator(OnThrowAdvice);

export const beforeStaticMethod = makeStaticMethodAdviceDecorator(BeforeAdvice);
export const afterStaticMethod = makeStaticMethodAdviceDecorator(AfterAdvice);
export const aroundStaticMethod = makeStaticMethodAdviceDecorator(AroundAdvice);
export const onThrowOfStaticMethod = makeStaticMethodAdviceDecorator(OnThrowAdvice);

// Async

export const asyncOnThrowOfMethod = makeMethodCallAdviceDecorator(AsyncOnThrowAdvice);

export const asyncOnThrowOfSetter = makeFieldSetAdviceDecorator(AsyncOnThrowAdvice);

export const asyncOnThrowOfGetter = makeFieldGetAdviceDecorator(AsyncOnThrowAdvice);

export const asyncOnThrowOfStaticMethod = makeStaticMethodAdviceDecorator(AsyncOnThrowAdvice);
