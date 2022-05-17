import { CourseListSelectors as selectors } from '../../utils/course-list-selectors';

describe('course list with api error', () => {
  beforeEach(() => {
    cy.intercept('/api/course-catalog/courses/', {
      statusCode: 404,
    });
    cy.intercept('/api/scheduling/schedule', {
      statusCode: 200,
      body: {
        data: [],
      },
    });
    cy.visit('/courses/list');
  });

  it('tacos', () => {});
});
