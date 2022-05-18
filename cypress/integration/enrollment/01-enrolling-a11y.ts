import { CourseListSelectors as selectors } from '../../utils/course-list-selectors';

const fixtureData = [
  {
    startDate: '2022-06-07T00:00:00',
    display: 'Jun 7, 2022 - Jun 10, 2022 (4 days)',
  },
  {
    startDate: '2022-08-01T00:00:00',
    display: 'Aug 1, 2022 - Aug 3, 2022 (3 days)',
  },
];

describe('enrolling for a course', () => {
  beforeEach(() => {
    cy.intercept('/api/course-catalog/courses/', {
      fixture: 'enrollment/courses.json',
    });
    cy.intercept('/api/scheduling/schedule', {
      fixture: 'enrollment/schedule.json',
    });

    cy.loginUser('Deadpool');
    cy.get('[data-nav-course-list]').click();
    cy.get(selectors.getCourseListItemEnrollButton('0')).click();
  });

  it('check for accessibility', () => {
    cy.checkForDetectableAccessibilityIssues();
  });
});
