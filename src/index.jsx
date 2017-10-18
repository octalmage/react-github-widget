import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'fetch-everywhere';
import FetchGithubRepo from './FetchGithubRepo';

const GithubBox = styled.div`
  font-family: helvetica, arial, sans-serif;
  font-size: 13px;
  line-height: 18px;
  background: #fafafa;
  border: 1px solid #ddd;
  color: #666;
  border-radius: 3px
`;

const GitHubTitle = styled.div`
  position: relative;
  border-bottom: 1px solid #ddd;
  border-radius: 3px 3px 0 0;
  background: #fcfcfc;
  background: linear-gradient(#fcfcfc, #ebebeb);
  & h3 {
    word-wrap: break-word;
    font-family: helvetica, arial, sans-serif;
    font-weight: normal;
    font-size: 16px;
    color: gray;
    margin: 0;
    padding: 10px 10px 10px 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXBAMAAAD0LQLXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURQAAAL29vc3NzcLCwsjIyNbW1pvTNOEAAAABdFJOUwBA5thmAAAATElEQVQI12MIFoQAEQZFYwcGEGBkUDRUQLCcsYjRXhbqKkEGZQYGqJgSnKXCwGgsAGYpqyobG4WGhioyhBhDgClI3EQAqpaZwQBEAQARmA4G2o55nQAAAABJRU5ErkJggg==) 7px center no-repeat;
    width: auto;
  }
  @media (max-width: 767px) {
    height: auto;
    min-height: 60px;
  }
`;

const GitHubStats = styled.div`
  float: right;
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 11px;
  font-weight: bold;
  line-height: 21px;
  height: auto;
  min-height: 21px
`;

const Link = styled.a`
  color: #4183c4;
  border: 0;
  text-decoration: none;
`;

const RepoLink = Link.extend`
  font-weight: bold;
  @media (max-width: 767px) {
    display: block;
  }
`;

const StatsLink = Link.extend`
  display: inline-block;
  height: 21px;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 5px 0 18px;
  background: white url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAqBAMAAABB12bjAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURf///5mZmdbW1u/v7/r6+rGxscXFxaSkpHLccIMAAABsSURBVBjTY2CgBmBODTOAsFgSi9TFHMBMc1Fmk8BiEItJUMhQWFFQAZXJoC7q7FJYhNBmgG7YQAIWMYTvEExXIbh8oAJWQQe4IGsIlKmowAZVwaKowgxlMgkKmwtCjRAUYBSEqnVkYBAm39EALMwNXwql3eYAAAAASUVORK5CYII=) no-repeat;
  @media (max-width: 767px) {
    display: block;
    clear: right;
    float: right;
  }
`;

const WatchersLink = StatsLink.extend`
  border-right: 1px solid #ddd;
`;

const ForkersLink = StatsLink.extend`
  background-position: -4px -21px;
  padding-left: 15px
`;

const GitHubContent = styled.div`
  padding: 10px;
  font-weight: 300;
  & > p {
    margin: 0;
  }
`;

const GitHubContentLink = styled.p`
  font-weight: bold;
`;

const Download = styled.div`
  position: relative;
  border-top: 1px solid #ddd;
  background: white;
  border-radius: 0 0 3px 3px;
  padding: 10px;
  height: auto;
  min-height: 24px;
  @media (max-width: 767px) {
    height: auto;
    min-height: 46px;
  }
`;

const Updated = styled.div`
  word-wrap: break-word;
  margin: 0;
  font-size: 11px;
  color: #666;
  line-height: 24px;
  font-weight: 300;
  width: auto;
  & strong {
    font-weight: bold;
    color: #000;
  }
`;

const DownloadButton = styled.div`
  float: right;
  position: absolute;
  top: 10px;
  right: 10px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #666;
  font-weight: bold;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
  padding: 0 10px;
  border: 1px solid #ddd;
  border-bottom-color: #bbb;
  border-radius: 3px;
  background: #f5f5f5;
  background: linear-gradient(#f5f5f5, #e5e5e5);
  cursor: pointer;
  &:hover {
    color: #527894;
    border-color: #cfe3ed;
    border-bottom-color: #9fc7db;
    background: #f1f7fa;
    background: linear-gradient(#f1f7fa, #dbeaf1);
  }

  @media (max-width: 767px) {
    top: 32px;
  }
`;

class GitHubWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: {
        watchers: '?',
        forks: '?',
      },
    };
  }

  componentDidMount() {
    return FetchGithubRepo(this.props.repository)
      .then((repo) => {
        this.setState({ repo });
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
      });
  }

  render() {
    const { repository } = this.props;
    const { repo } = this.state;
    const [vendorName, repoName] = repository.split('/');
    const vendorUrl = `http://github.com/${vendorName}`;
    const repoUrl = `http://github.com/${vendorName}/${repoName}`;

    return (
      <GithubBox>
        <GitHubTitle>
          <h3>
            <Link href={vendorUrl} title={vendorUrl}>{vendorName}</Link>
            /
            <RepoLink href={repoUrl} title={repoUrl}>{repoName}</RepoLink>
          </h3>
          <GitHubStats>
            <WatchersLink href={`${repoUrl}/watchers`} title="See watchers">{repo.watchers}</WatchersLink>
            <ForkersLink href={`${repoUrl}/network/members`} title="See forkers">{repo.forks}</ForkersLink>
          </GitHubStats>
        </GitHubTitle>
        <GitHubContent>
          <p className="description"><span>{repo.description}</span> &mdash; <Link href={`${repoUrl}#readme`}>Read More</Link></p>
          {repo.homepage &&
            <GitHubContentLink><Link href={repo.homepage}>{repo.homepage}</Link></GitHubContentLink>
          }
        </GitHubContent>
        <Download>
          {repo.pushed_at &&
            <Updated>
              Latest commit to the{' '}
              <strong>{repo.default_branch}</strong> branch on {repo.pushed_at.substring(0, 10)}
            </Updated>
          }
          <DownloadButton href={`${repoUrl}/zipball/master`} title="Get repository">Download as zip</DownloadButton>
        </Download>
      </GithubBox>
    );
  }
}

GitHubWidget.propTypes = {
  /** The GitHub repository to display information about in "username/project" format. */
  repository: PropTypes.string.isRequired,
};

export default GitHubWidget;
