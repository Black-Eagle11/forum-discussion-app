// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import daStyle from 'eslint-config-dicodingacademy';

export default [daStyle, ...storybook.configs["flat/recommended"]];
