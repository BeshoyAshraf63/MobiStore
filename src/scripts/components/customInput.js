const $ = require("jquery");

function customInput(element) {
  const el = $(element);

  const defaultOptions = {
    min: 1,
    max: 100,
    value: 1,
    step: 1,
  };

  let options = {};
  Object.assign(options, defaultOptions);
  const obj = {
    input: el.find('input[type="number"]'),
    btnIncrement: el.find(".btn-increment"),
    btnDecrement: el.find(".btn-decrement"),
    numberLabel: el.find(".number-label"),
    init() {
      this.setup();
      this.events();
      return this;
    },
    updateBtns(newVal) {
      if (newVal - options.step < options.min) {
        this.btnDecrement.addClass("disabled");
      } else {
        this.btnDecrement.removeClass("disabled");
      }
      if (newVal + options.step > options.max) {
        this.btnIncrement.addClass("disabled");
      } else {
        this.btnIncrement.removeClass("disabled");
      }
    },
    setup() {
      if (this.input.attr("min")) {
        options.min = parseInt(this.input.attr("min"));
      }
      if (this.input.attr("max")) {
        options.max = parseInt(this.input.attr("max"));
      }
      if (this.input.attr("step")) {
        options.step = parseInt(this.input.attr("step"));
      }
      if (this.input.attr("value")) {
        if (
          this.input.attr("value") <= this.input.attr("max") &&
          this.input.attr("value") >= this.input.attr("min")
        ) {
          options.value = parseInt(this.input.attr("value"));
        } else {
          this.input.attr("value", options.min);
          options.value = options.min;
        }
      }
      this.numberLabel.text(options.value);
      this.updateBtns(options.value);
    },
    events() {
      let that = this;
      this.btnIncrement.on("click", function () {
        const oldValue = parseInt($(that.input).val());
        let newVal;
        if (oldValue + options.step > options.max) {
          newVal = oldValue;
        } else {
          newVal = oldValue + options.step;
        }
        $(that.input).val(newVal);
        $(that.input).trigger("change", [newVal]);
      });

      this.btnDecrement.on("click", function () {
        const oldValue = parseInt($(that.input).val());
        let newVal;
        if (oldValue - options.step < options.min) {
          newVal = oldValue;
        } else {
          newVal = oldValue - options.step;
        }
        $(that.input).val(newVal);

        $(that.input).trigger("change", [newVal]);
      });

      this.input.on("change", function (e, newVal) {
        $(that.numberLabel).text(newVal);
        that.updateBtns(newVal);
      });
    },
  };
  return obj.init();
}

module.exports = {
  customInput,
};
