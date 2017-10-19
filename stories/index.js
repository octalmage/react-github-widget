/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo, setDefaults } from '@storybook/addon-info';
import GitHubWidget from '../src/index';
import cachedRepoData from '../src/__mocks__/__mockData__/cachedRepo';

setDefaults({
  inline: true,
  header: false,
});

storiesOf('GitHubWidget', module)
  .add('This Repo', withInfo()(() =>
    <GitHubWidget repository="octalmage/react-github-widget" />))
  .add('Another Example', withInfo()(() => <GitHubWidget repository="octalmage/robotjs" />))
  .add('Caching', withInfo('Use this technique to cache the response from GitHub.')(() => <GitHubWidget repository="octalmage/react-github-widget" onDataFetched={action('Cache GitHub Response')} />))
  .add('Preloading Cached Data', withInfo('Use this to preload the repository information from a cache, or to make the request on your own.')(() => <GitHubWidget repository="cached/fake-repo" data={cachedRepoData} />));
