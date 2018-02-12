import { HelloSchedulePage } from './app.po';

describe('hello-schedule App', () => {
  let page: HelloSchedulePage;

  beforeEach(() => {
    page = new HelloSchedulePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
