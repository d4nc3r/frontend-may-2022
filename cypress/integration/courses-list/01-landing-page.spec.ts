import { CourseListSelectors as selectors } from '../../utils/course-list-selectors';

describe('The Courses List', () => {
  beforeEach(() => {
    cy.intercept('/api/course-catalog/courses/', {
      fixture: 'courses-api/happy.json',
    });
    cy.intercept('/api/scheduling/schedule', {
      statusCode: 200,
    });
  });

  it('should go to the default route', () => {
    cy.visit('/courses');
    cy.url().should('match', /\/courses\/list$/);
  });

  describe('the list items - user not logged in', () => {
    describe('the first list item', () => {
      it('exists', () => {
        cy.get(selectors.getCourseListItem('0')).should('exist');
        //.children()
        //.get('.card-header') // doesn't chain off result of the prev get, it goes after the whole dom, w/o using .children
        //.should('contain.text', 'Taco Salad');
      });

      it('should display the title from the API', () => {
        cy.get(selectors.getCourseListItemHeader('0')).should(
          'contain.text',
          'Taco Salad'
        );
      });

      it('should display the overview', () => {
        cy.get(selectors.getCourseListOverview('0')).should(
          'contain.text',
          'Taco Salad is training for Angular'
        );
      });

      it('should display the log in button', () => {
        cy.get(selectors.getCourseListItemLoginButton('0')).should('exist');
      });

      it('should not display the enroll button', () => {
        cy.get(selectors.getCourseListItemEnrollButton('0')).should(
          'not.exist'
        );
      });
    });

    describe('the second list item', () => {
      it('exists', () => {
        cy.get(selectors.getCourseListItem('1')).should('exist');
      });
    });
  });

  describe('list items - user logged in', () => {
    beforeEach(() => {
      cy.visit('/');

      // Log user in
      cy.get('[data-auth-login]').click();
      cy.get('#userName').type('mal');
      cy.get('#password').type('12345678');
      cy.get('[data-auth-login-submit]').click();

      cy.get('[data-nav-course-list]').click();
    });

    it('should display enroll button', () => {
      cy.get('[data-courses-list-item-enroll-btn="0"]').should('exist');
    });
  });
});
