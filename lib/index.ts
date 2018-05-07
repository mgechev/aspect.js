import { AfterAdvice, AroundAdvice, AsyncOnThrowAdvice, BeforeAdvice, OnThrowAdvice } from './advices';
import {
  makeFieldGetAdviceDecorator,
  makeFieldSetAdviceDecorator,
  makeMethodCallAdviceDecorator,
  makeStaticMethodAdviceDecorator,
  MemberPrecondition,
  MemberSelector,
  MethodSelector,
} from './join_points';

export {makeMemberDecorator, makeMethodDecorator, Wove, Metadata, MethodMetadata, AspectRegistry, Targets} from './core';

// Sync
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

// Async
export const asyncOnThrowOfMethod = makeMethodCallAdviceDecorator(AsyncOnThrowAdvice);
export const asyncOnThrowOfSetter = makeFieldSetAdviceDecorator(AsyncOnThrowAdvice);
export const asyncOnThrowOfGetter = makeFieldGetAdviceDecorator(AsyncOnThrowAdvice);
export const asyncOnThrowOfStaticMethod = makeStaticMethodAdviceDecorator(AsyncOnThrowAdvice);

// Static
export const beforeStaticMethod = makeStaticMethodAdviceDecorator(BeforeAdvice);
export const afterStaticMethod = makeStaticMethodAdviceDecorator(AfterAdvice);
export const aroundStaticMethod = makeStaticMethodAdviceDecorator(AroundAdvice);
export const onThrowOfStaticMethod = makeStaticMethodAdviceDecorator(OnThrowAdvice);
