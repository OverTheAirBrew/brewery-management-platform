module.exports = {
  baseBranch: 'main',
  plugins: [
    [
      'npm',
      {
        exact: true,
        commitNextVersion: false,
        monorepoChangelog: false,
      },
    ],
    'conventional-commits',
    // 'first-time-contributor',
    // 'all-contributors',
    'released',
    // 'microsoft-teams', // uses env MICROSOFT_TEAMS_WEBHOOK_URL
  ],
  // prereleaseBranches: ['next'],
};
