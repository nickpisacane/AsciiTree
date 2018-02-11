# ASCII Tree

WIP. More to come soon.

## Turn This
```js
const tree = {
  value: 'Foo',
  children: [
    {
      value: 'Bar',
      children: [
        'Bar-1',
        'Bar-2',
      ]
    },
    {
      value: 'Bang',
      children: [
        {
          value: 'Bang-1',
          children: [
            'Bang-1-1',
            'Bang-1-2',
            'Bang-1-3',
          ]
        },
        'Bang-2',
      ],
    },
  ],
};
```

## Into This
```txt
                                  Foo                                 
          __________________________|_______                          
          |                                |                          
        Bar                              Bang                         
     _____|___                       ______|_________________         
     |       |                       |                      |         
  Bar-1   Bar-2                   Bang-1                 Bang-2       
                         ____________|__________                      
                         |          |          |                      
                     Bang-1-1   Bang-1-2   Bang-1-3                   
```
