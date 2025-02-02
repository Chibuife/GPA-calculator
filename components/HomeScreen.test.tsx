import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../app/index';



describe('HomeScreen Component', () => {
    const renderComponent = () => render(
        <HomeScreen />
    );

    test('renders correctly', async () => {
        const { getByText, debug } = renderComponent();
        debug()
        expect(getByText('GPA Calculator')).toBeTruthy();
        expect(getByText('Calculate')).toBeTruthy();
    });

    test('adds a semester when "Add Semester" is pressed', () => {
        const { getByText, queryByText } = renderComponent();

        expect(queryByText('Semester 1')).toBeNull();

        fireEvent.press(getByText('Add Semester'));

        expect(getByText('Semester 1')).toBeTruthy();
    });

    test('adds a course/grade/units when "Add Course" is pressed', () => {
        const { getByText, getByLabelText } = renderComponent();

        fireEvent.press(getByText('Add Semester'));

        expect(getByLabelText('Course Name')).toBeTruthy();
        expect(getByLabelText('Grade')).toBeTruthy();
        expect(getByLabelText('Units')).toBeTruthy();
    });

    test('calculates GPA correctly', async () => {
        const { getByText, getByLabelText, getByTestId } = renderComponent();

        // Add a semester
        fireEvent.press(getByText('Add Semester'));

        // Fill course details
        fireEvent.changeText(getByLabelText('Course Name'), 'Mathematics');
        fireEvent(getByLabelText('Grade'), 'onValueChange', 'A');
        fireEvent(getByLabelText('Units'), 'onValueChange', '3');

        // Click Calculate
        fireEvent.press(getByText('Calculate'));

        await waitFor(() => {
            expect(getByText('GPA')).toBeTruthy();
        });
    });
});
