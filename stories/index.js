import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import GitHubWidget from '../src/index';

storiesOf('GitHubWidget', module)
  .add('Default', () => <GitHubWidget repository="octalmage/react-github-widget" />);
