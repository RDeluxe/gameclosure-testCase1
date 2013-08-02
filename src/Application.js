import device;

import ui.StackView as StackView;

import src.testCase as testCase;

exports = Class(GC.Application, function() {

  this.initUI = function() {
    this.engine.updateOpts({
      alwaysRepaint: true,
      clearEachFrame: false,
      keyListenerEnabled: false,
      logsEnabled: true,
      noTimestep: false,
      noReflow: false,
      showFPS: false,
      resizeRootView: false,
      preload: ['resources/images', 'resources/audio']
    });

    this.view.style.backgroundColor = '#000000';

    // Init the stack view
    this.stackView = new StackView({
      superview: this,
      x: 0,
      y: 0,
      width: device.width,
      height: device.height
    });

    // Home screen
    this.stackView.push(new testCase());

  };

  this.launchUI = function() {};

});