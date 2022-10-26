import { render, screen } from "@testing-library/react";
import { CountdownTimer } from "./App";

describe("Countdown timer tests", () => {
  it("As a user, I want to see my target time's time in the format HR:MIN AM/PM, MONTH, DAY, YEAR", () => {
    const date: Date = new Date(2022, 9, 31, 23, 59, 23);
    const result: string = "11:59 PM, October 31, 2022";
    render(<CountdownTimer targetDate={date} />);

    expect(screen.getByText(result)).toBeTruthy();
  });
});