import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import GitHubWidget from './index';
import cachedRepoData from './__mocks__/__mockData__/cachedRepo';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./FetchGithubRepo');

test('Renders correctly.', async () => {
  const mounted = mount(<GitHubWidget repository="octalmage/react-github-widget" />);
  mounted.instance().componentDidMount().then(() => {
    mounted.update();
    expect(mounted).toMatchSnapshot();
    return Promise.resolve();
  });
});

test('Renders preloaded data correctly.', () => {
  const mounted = mount(<GitHubWidget repository="fake/preloaded-repo" data={cachedRepoData} />);
  expect(mounted).toMatchSnapshot();
});

test('Calls onDataFetched with GitHub response.', async () => {
  const onDataFetched = jest.fn();

  const mounted = mount(<GitHubWidget
    repository="octalmage/react-github-widget"
    onDataFetched={onDataFetched}
  />);

  await mounted.instance().componentDidMount().then((response) => {
    expect(onDataFetched).toBeCalledWith(response);
    return Promise.resolve();
  });
});

test('Calls console.error when rate limited.', async () => {
  global.console.error = jest.fn();
  const mounted = mount(<GitHubWidget
    repository="rate/limited"
  />);

  await mounted.instance().componentDidMount().then(() => {
    expect(global.console.error).toBeCalledWith(new Error('Rate Limited!'));
    return Promise.resolve();
  });
});
