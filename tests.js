'use strict';

define('ember-mocha-demo/tests/app.lint-test', [], function () {
  'use strict';

  describe('ESLint | app', function () {

    it('app.js', function () {
      // test passed
    });

    it('components/my-component.js', function () {
      // test passed
    });

    it('models/child.js', function () {
      // test passed
    });

    it('models/parent.js', function () {
      // test passed
    });

    it('resolver.js', function () {
      // test passed
    });

    it('router.js', function () {
      // test passed
    });
  });
});
define('ember-mocha-demo/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  var run = Ember.run;
  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('ember-mocha-demo/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember-mocha-demo/tests/helpers/start-app', 'ember-mocha-demo/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('ember-mocha-demo/tests/helpers/resolver', ['exports', 'ember-mocha-demo/resolver', 'ember-mocha-demo/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('ember-mocha-demo/tests/helpers/start-app', ['exports', 'ember-mocha-demo/app', 'ember-mocha-demo/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  var merge = Ember.merge;
  var run = Ember.run;
  function startApp(attrs) {
    var attributes = merge({}, _environment.default.APP);
    attributes = merge(attributes, attrs); // use defaults, but you can override;

    return run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('ember-mocha-demo/tests/integration/components/my-component-test', ['chai', 'mocha', 'ember-mocha', 'ember-mocha-demo/initializers/ember-cli-mirage', 'ember-test-helpers/wait'], function (_chai, _mocha, _emberMocha, _emberCliMirage, _wait) {
  'use strict';

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  (0, _mocha.describe)('Integration | Component | my component', function () {
    (0, _emberMocha.setupComponentTest)('my-component', {
      integration: true
    });

    (0, _mocha.beforeEach)(function () {
      _emberCliMirage.default.initialize(this.container);
      this.inject.service('store');
      var store = this.get('store');
      var origWillDestroy = store.willDestroy;
      store.willDestroy = function () {
        origWillDestroy.call(this);
        console.log('service:store willDestroy');
      };

      server.createList('parent', 1);
      server.logging = true;
      var parents = this.get('store').findAll('parent', { reload: true });
      this.set('parents', parents);
      return parents;
    });

    (0, _mocha.afterEach)(function () {
      window.server.shutdown();
      console.log('end of afterEach');
    });

    (0, _mocha.it)('works', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "FGflhZy2",
                "block": "{\"symbols\":[],\"statements\":[[1,[25,\"my-component\",null,[[\"parents\"],[[20,[\"parents\"]]]]],false]],\"hasEval\":false}",
                "meta": {}
              }));
              (0, _chai.expect)(this.$('.parent')).to.have.length(1);
              _context.next = 4;
              return (0, _wait.default)();

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    (0, _mocha.it)('does not work', function () {
      console.log('before rendering');
      this.render(Ember.HTMLBars.template({
        "id": "FGflhZy2",
        "block": "{\"symbols\":[],\"statements\":[[1,[25,\"my-component\",null,[[\"parents\"],[[20,[\"parents\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      console.log('after rendering');
      (0, _chai.expect)(this.$('.parent')).to.have.length(1);
      console.log('after assertion');
    });
  });
});
define('ember-mocha-demo/tests/test-helper', ['ember-mocha-demo/tests/helpers/resolver', 'ember-mocha'], function (_resolver, _emberMocha) {
  'use strict';

  (0, _emberMocha.setResolver)(_resolver.default);

  window.mocha.setup({
    timeout: 200000,
    slow: 2000
  });
});
define('ember-mocha-demo/tests/tests.lint-test', [], function () {
  'use strict';

  describe('ESLint | tests', function () {

    it('helpers/destroy-app.js', function () {
      // test passed
    });

    it('helpers/module-for-acceptance.js', function () {
      // test passed
    });

    it('helpers/resolver.js', function () {
      // test passed
    });

    it('helpers/start-app.js', function () {
      // test passed
    });

    it('integration/components/my-component-test.js', function () {
      // test failed
      var error = new chai.AssertionError('integration/components/my-component-test.js should pass ESLint\n\n26:7 - Unexpected console statement. (no-console)\n38:5 - Unexpected console statement. (no-console)\n48:5 - Unexpected console statement. (no-console)\n50:5 - Unexpected console statement. (no-console)\n52:5 - Unexpected console statement. (no-console)');
      error.stack = undefined;
      throw error;
    });

    it('test-helper.js', function () {
      // test passed
    });
  });
});
require('ember-mocha-demo/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
