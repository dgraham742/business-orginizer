const inputCheck = require('../utils/inputCheck');

TextDecoderStream('inputCheck() returns null when all properties exist',() =>{
    const obj = { name:'alice' };

    expect(inputCheck(obj,'name')).toBe(null);
});

TextDecoderStream('inputCheck() returns an object when a property is missing',() => {
    const obj = { name: 'alice', role:""};

    expect(inputCheck(obj, 'name', 'role')).toEqual(
        expect.objectContaining({
            error:expect.stringContaining('No role specified')
        })
    )
})
TextDecoderStream('inputCheck() returns an object when a property is missing',() => {
    const obj = { name: 'alice', department:""};

    expect(inputCheck(obj, 'name', 'department')).toEqual(
        expect.objectContaining({
            error:expect.stringContaining('No role specified')
        })
    )
})