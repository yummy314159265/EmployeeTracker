import inquirer from 'inquirer';
import chalk from 'chalk';
import { Query } from './lib/Query.js';

const welcomeMessage = `


                      /\\
___                  /  \\                  ___
/   \\     __        /    \\         __     /
/     \\   /  \\   _ / ${chalk.red(`<()>`)} \\   _   /  \\   /
     \\_/    \\_/ \\_/________\\_/ \\_/    \\_/
_________________/__I___I___\\________________
                /_I___I___I__\\
               /I___I___I___I_\\
              /___I___I___I___I\\
             /__I___I___I___I___\\
            /_I___I___I___I___I__\\
           /I___I___I___I___I___I_\\
          /___I___I___I___I___I___I\\
         /__I___I___I___I___I___I___\\
        /_I___I___I___I___I___I___I__\\ 
        
                  WELCOME TO
        
               EMPLOYEE TRACKER
`