<template>
  <div class="select-container">
    <label>{{ label }}</label>

    <select
      v-bind:class="{ error: dataError }"
      :required="required"
      :value="value"
      :error="dataError"
      @change="onChange"
    >
      <option disabled selected value="">Select a Category</option>
      <option
        v-for="category in categories"
        :value="category.value"
        :key="category.value"
        >{{ category.text }}</option
      >
    </select>

    <span v-if="dataError" class="errorMessage">{{ dataErrorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    label: String,
    value: String,
    required: Boolean,
    categories: Array
  },
  data() {
    return {
      dataError: false,
      dataErrorMessage: ""
    };
  },
  watch: {
    error: function(newValue) {
      this.dataError = newValue;
    }
  },
  methods: {
    onChange(e) {
      this.dataError = false;
      this.$emit("input", e.target.value);
      this.$emit("touched");
    },
    validate() {
      if (this.required === true && this.value === "") {
        this.dataError = true;
        this.dataErrorMessage = "This field is required and must be filled";
      } else {
        this.dataError = false;
        this.dataErrorMessage = "";
      }

      return this.dataError;
    }
  }
};
</script>

<style scoped lang="scss">
.select-container {
  padding-top: 16px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 14px;
  }

  select {
    text-indent: 8px;
    height: 40px;
    background-color: white;
    border: 1px solid lightgrey;
    font-size: 14px;
    &:focus {
      outline: none;
    }
    &.error {
      color: red;
      border: 1px solid red;
    }
  }

  option:first-child {
    color: green;
  }

  input {
    padding: 15px;
    box-sizing: border-box;
    background-color: white;
    border: none;
    border-radius: 2px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid lightgrey;
    font-size: 14px;
    &::placeholder {
      font-size: 12px;
      font-weight: 500;
      color: grey;
    }
    &:focus {
      outline: none;
    }
    &.error {
      color: red;
      border: 1px solid red;
      &::placeholder {
        color: red;
      }
    }
  }
  .errorMessage {
    margin: 5px;
    color: red;
    font-size: 12px;
  }
}
</style>
