import {Calculator} from '../calculator';

describe("Calculator", function() {
    describe("Addition function", function() {
        it("should return 42", function() {
            let calc = new Calculator();
            expect(calc.addition(20, 22)).toBe(42);
        });
    });
});