import { groupBy } from 'cypress/types/lodash';
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

  it('displays the dates properly', () => {
    cy.get('[data-enrollment-date-list] > option').each(
      (option: HTMLOptionElement, idx) => {
        cy.wrap(option)
          .should('contain.text', fixtureData[idx].display)
          .should('have.value', fixtureData[idx].startDate);
      }
    );
  });

  describe('submitting the enrollment', () => {
    beforeEach(() => {
      cy.intercept('/api/registrations', {}).as('registrationsApi');
    });

    it('watermelon', () => {
      cy.get('[data-enrollment-date-list]').select(fixtureData[0].startDate);
      cy.get('button[type="submit"]').click();

      cy.wait('@registrationsApi').then((inter) => {
        assert.isNotNull(inter.request.body);
      });
    });
  });
});
