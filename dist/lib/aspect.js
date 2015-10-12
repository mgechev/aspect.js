(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './src/core', './src/joint_points', './src/advices', './src/joint_points', './src/joint_points'], function (require, exports) {
    var core_1 = require('./src/core');
    exports.Wove = core_1.Wove;
    exports.Metadata = core_1.Metadata;
    exports.MethodMetadata = core_1.MethodMetadata;
    var joint_points_1 = require('./src/joint_points');
    exports.MemberPrecondition = joint_points_1.MemberPrecondition;
    var advices_1 = require('./src/advices');
    var joint_points_2 = require('./src/joint_points');
    var joint_points_3 = require('./src/joint_points');
    exports.beforeMethod = joint_points_2.makeMethodCallAdviceDecorator(advices_1.BeforeAdvice);
    exports.afterMethod = joint_points_2.makeMethodCallAdviceDecorator(advices_1.AfterAdvice);
    exports.aroundMethod = joint_points_2.makeMethodCallAdviceDecorator(advices_1.AroundAdvice);
    exports.onThrowOfMethod = joint_points_2.makeMethodCallAdviceDecorator(advices_1.OnThrowAdvice);
    exports.beforeSetter = joint_points_3.makeFieldSetAdviceDecorator(advices_1.BeforeAdvice);
    exports.afterSetter = joint_points_3.makeFieldSetAdviceDecorator(advices_1.AfterAdvice);
    exports.aroundSetter = joint_points_3.makeFieldSetAdviceDecorator(advices_1.AroundAdvice);
    exports.onThrowOfSetter = joint_points_3.makeFieldSetAdviceDecorator(advices_1.OnThrowAdvice);
    exports.beforeGetter = joint_points_3.makeFieldGetAdviceDecorator(advices_1.BeforeAdvice);
    exports.afterGetter = joint_points_3.makeFieldGetAdviceDecorator(advices_1.AfterAdvice);
    exports.aroundGetter = joint_points_3.makeFieldGetAdviceDecorator(advices_1.AroundAdvice);
    exports.onThrowOfGetter = joint_points_3.makeFieldGetAdviceDecorator(advices_1.OnThrowAdvice);
    exports.beforeStaticMethod = joint_points_2.makeStaticMethodAdviceDecorator(advices_1.BeforeAdvice);
    exports.afterStaticMethod = joint_points_2.makeStaticMethodAdviceDecorator(advices_1.AfterAdvice);
    exports.aroundStaticMethod = joint_points_2.makeStaticMethodAdviceDecorator(advices_1.AroundAdvice);
    exports.onThrowOfStaticMethod = joint_points_2.makeStaticMethodAdviceDecorator(advices_1.OnThrowAdvice);
});
