/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo, setDefaults } from '@storybook/addon-info';
import GitHubWidget from '../src/index';

setDefaults({
  inline: true,
  header: false,
});

storiesOf('GitHubWidget', module)
  .add('This Repo', withInfo()(() =>
    <GitHubWidget repository="octalmage/react-github-widget" />))
  .add('Another Example', withInfo()(() => <GitHubWidget repository="octalmage/robotjs" />));
