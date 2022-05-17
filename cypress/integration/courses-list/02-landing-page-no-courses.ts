import { CourseListSelectors as selectors } from '../../utils/course-list-selectors';

describe('course list with no courses', () => {
  beforeEach(() => {
    cy.intercept('/api/course-catalog/courses/', {
      statusCode: 200,
      body: {
        data: [],
      },
    });
    cy.intercept('/api/scheduling/schedule', {
      statusCode: 200,
      body: {
        data: [],
      },
    });
    cy.visit('/courses/list');
  });

  it('tacos', () => {
    cy.get(selectors.getCourseListEmptyNotification()).should('exist');
  });
});
