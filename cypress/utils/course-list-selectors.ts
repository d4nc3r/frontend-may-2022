export const CourseListSelectors = {
  getCourseListItem: (id: string) => `[data-courses-list-item="${id}"]`,
  getCourseListItemHeader: (id: string) => buildMatcher('header', id),
  getCourseListOverview: (id: string) => buildMatcher('overview', id),
  getCourseListItemLoginButton: (id: string) => buildMatcher('login-btn', id),
  getCourseListItemEnrollButton: (id: string) => buildMatcher('enroll-btn', id),
  getCourseListEmptyNotification: () =>
    '[data-courses-empty-list-notification]',
};

function buildMatcher(thing: string, id: string) {
  return `[data-courses-list-item-${thing}="${id}"]`;
}
