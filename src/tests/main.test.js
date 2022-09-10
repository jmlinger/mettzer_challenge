/* eslint-disable no-undef */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Main from '../pages/Main';
import { renderWithRouter } from './testConfig';

describe('Units test main page.', () => {
  describe('Tests with no content table.', () => {
    describe('Search for Articles mode.', () => {
      test('Verify if the page have all expected elements.', () => {
        renderWithRouter(<Main />);

        const title = screen.getByText('Scientific Articles');
        const subtitle = screen.getByText('Search for Articles');
        const favBtnMode = screen.getByRole('button', { name: 'Favorite Mode' });
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');
        const noRecordsMsg = screen.getByText('There are no records to display');

        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
        expect(favBtnMode).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(searchInput).toHaveAttribute('type', 'text');
        expect(noRecordsMsg).toBeInTheDocument();
      });

      test('Verify if submit button is disabled.', () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });

        expect(submitButton).toBeDisabled();
      });

      test('Verify if submit button is enable after type something on input.', () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');

        expect(submitButton).toBeEnabled();
      });
    });
    describe('Favorite Articles mode.', () => {
      test('Verify if the page have all expected elements.', () => {
        renderWithRouter(<Main />);

        const favBtnMode = screen.getByRole('button', { name: 'Favorite Mode' });

        userEvent.click(favBtnMode);

        const title = screen.getByText('Scientific Articles');
        const subtitle = screen.getByText('Favorite Articles');
        const searchBtnMode = screen.getByRole('button', { name: 'Search Mode' });
        const noRecordsMsg = screen.getByText('There are no records to display');

        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
        expect(searchBtnMode).toBeInTheDocument();
        expect(noRecordsMsg).toBeInTheDocument();
      });
      test('Verify if search button mode works.', () => {
        renderWithRouter(<Main />);

        const favBtnMode = screen.getByRole('button', { name: 'Favorite Mode' });

        userEvent.click(favBtnMode);

        const searchBtnMode = screen.getByRole('button', { name: 'Search Mode' });

        userEvent.click(searchBtnMode);

        const subtitle = screen.getByText('Search for Articles');
        expect(subtitle).toBeInTheDocument();
      });
    });
  });
  describe('Tests with content table.', () => {
    describe('Search for Articles mode.', () => {
      test('Verify if loading text appears after submit the search.', () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        const loadingMsg = screen.getByText('Loading...');

        expect(loadingMsg).toBeInTheDocument();
      });

      test('Verify table elements.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await new Promise((r) => setTimeout(r, 3000));

        const tableHeader = screen.getAllByRole('heading')[0];
        const subHeader = screen.getByTestId('subheader');
        const tableHead = screen.getAllByRole('rowgroup')[0];
        const tableBody = screen.getAllByRole('rowgroup')[1];
        const pagination = screen.getByRole('navigation');

        expect(tableHeader).toHaveClass('sc-fEOsli fuRmuE rdt_TableHeader');
        expect(subHeader).toHaveClass('sc-cCsOjp sc-ciZhAO dhbTLO dtBSte');
        expect(tableHead).toHaveClass('sc-gsnTZi TpgDh rdt_TableHead');
        expect(tableBody).toHaveClass('sc-hHLeRK gFYXSL rdt_TableBody');
        expect(pagination).toHaveClass('sc-iIPllB yqZZN rdt_Pagination');
      }, 10000);

      test('Verify if table has six columns.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await new Promise((r) => setTimeout(r, 3000));

        const columnheaders = screen.getAllByRole('columnheader');

        expect(columnheaders).toHaveLength(6);
      }, 10000);

      test('Verify tableHead columnheaders text.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await new Promise((r) => setTimeout(r, 3000));

        const columnheaders = [
          screen.getByText('Favorite'),
          screen.getByText('Authors'),
          screen.getByText('Type'),
          screen.getByText('Title'),
          screen.getByText('Description'),
          screen.getByText('Urls')
        ];
        columnheaders.forEach((columnheader) => {
          expect(columnheader).toHaveClass('sc-evZas eUeqdG');
        });
      }, 10000);

      test('Verify if tablebody has ten elements.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await new Promise((r) => setTimeout(r, 3000));

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(11); // first row is from theader
      }, 10000);

      test('Verify pagination elements.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await waitFor(
          () => {
            const pagination = screen.getByRole('navigation');
            const { getByRole, getByText, getAllByRole } = within(pagination);

            const rowsPerPageLabel = getByText('Rows per page:');
            const rowsPerPageSelect = getByRole('combobox');
            const selectOptions = getAllByRole('option');
            const pagesInfo = getByText('1-10 of 100');
            const pageBtns = getAllByRole('button');

            expect(rowsPerPageLabel).toHaveClass('sc-bZkfAO sc-ikZpkk lmGpws kBhHpT');
            expect(rowsPerPageSelect).toHaveClass('sc-cxabCf kJrhuj');
            expect(selectOptions).toHaveLength(5);
            expect(pagesInfo).toHaveClass('sc-bZkfAO sc-kLLXSd lmGpws OHwJB');

            pageBtns.forEach((element) => {
              expect(element).toHaveClass('sc-gicCDI bvxQGL');
            });
          },
          { timeout: 3000 }
        );
      }, 10000);
    });

    describe('Favorite Articles mode.', () => {
      beforeEach(() => {
        localStorage.clear();
      });

      test('Verify if favorite icons alternate by click.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await new Promise((r) => setTimeout(r, 3000));

        const favIconBtn = screen.getAllByTestId('fav-icon-button')[0];

        const favIconClick0 = screen.getAllByTestId('fav-icon')[0];
        expect(favIconClick0).toHaveClass('sc-jIZahH gCylQI');

        userEvent.click(favIconBtn);
        const favIconClick1 = screen.getAllByTestId('fav-icon')[0];
        expect(favIconClick1).toHaveClass('sc-himrzO itMqwX');

        userEvent.click(favIconBtn);
        const favIconClick2 = screen.getAllByTestId('fav-icon')[0];
        expect(favIconClick2).toHaveClass('sc-jIZahH gCylQI');
      }, 10000);

      test('Verify if favorite list have three elements after favorite the same number of articles.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const favBtnMode = screen.getByRole('button', { name: 'Favorite Mode' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await new Promise((r) => setTimeout(r, 3000));

        const favIconBtn1 = screen.getAllByTestId('fav-icon-button')[0];
        const favIconBtn2 = screen.getAllByTestId('fav-icon-button')[1];
        const favIconBtn3 = screen.getAllByTestId('fav-icon-button')[2];

        userEvent.click(favIconBtn1);
        userEvent.click(favIconBtn2);
        userEvent.click(favIconBtn3);

        userEvent.click(favBtnMode);

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(4); // first row is from theader
      }, 10000);

      test('Verify if an article is excluded after unfavorite it.', async () => {
        renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const favBtnMode = screen.getByRole('button', { name: 'Favorite Mode' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        await new Promise((r) => setTimeout(r, 3000));

        const favIconBtn1 = screen.getAllByTestId('fav-icon-button')[0];
        const favIconBtn2 = screen.getAllByTestId('fav-icon-button')[1];

        userEvent.click(favIconBtn1);
        userEvent.click(favIconBtn2);

        userEvent.click(favBtnMode);

        expect(screen.getAllByRole('row')).toHaveLength(3); // first row is from theader

        userEvent.click(favIconBtn2);

        expect(screen.getAllByRole('row')).toHaveLength(2); // first row is from theader
      }, 10000);

      test('Checks if favorite list persists after page reload.', async () => {
        const { rerender } = renderWithRouter(<Main />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const favBtnMode = screen.getByRole('button', { name: 'Favorite Mode' });
        const searchInput = screen.getByLabelText('Search:');

        userEvent.type(searchInput, 'natalia');
        userEvent.click(submitButton);

        const favIconBtn1 = screen.getAllByTestId('fav-icon-button')[0];
        const favIconBtn2 = screen.getAllByTestId('fav-icon-button')[1];
        const favIconBtn3 = screen.getAllByTestId('fav-icon-button')[2];

        userEvent.click(favIconBtn1);
        userEvent.click(favIconBtn2);
        userEvent.click(favIconBtn3);

        userEvent.click(favBtnMode);

        expect(screen.getAllByRole('row')).toHaveLength(4); // first row is from theader

        rerender(<Main />);

        userEvent.click(screen.getByRole('button', { name: 'Favorite Mode' }));

        expect(screen.getAllByRole('row')).toHaveLength(4); // first row is from theader
      }, 10000);
    });
  });
});
