import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import GitHubWidget from './index';
import FetchGithubRepo from './FetchGithubRepo';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./FetchGithubRepo');

test('Renders Correctly', async () => {
  // Render a checkbox with label in the document
  const mounted = mount(<GitHubWidget repository="octalmage/react-github-widget" />);
  await FetchGithubRepo('octalmage/react-github-widget').then(() => {
    mounted.update();
    expect(mounted).toMatchSnapshot();
    return Promise.resolve();
  });
});
