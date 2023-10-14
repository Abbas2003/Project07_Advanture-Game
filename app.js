#! /usr/bin/env node
// Advanture Game
import chalk from 'chalk';
import promptSync from 'prompt-sync';
const prompt = promptSync();
class AdventureGame {
    static main() {
        // Game Variables
        const enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
        const maxEnemyHealth = 75;
        const enemyAttackDamage = 25;
        // Player Variables
        let health = 100;
        const attackDamage = 50;
        let numHealthPotions = 3;
        const healthPotionHealAmount = 30;
        const healthPotionDropChance = 50; // Percentage
        let running = true;
        console.log(chalk.bold("\t\tWelcome to Dungeon!"));
        GAME: while (running) {
            console.log(chalk.gray("------------------------------------------------"));
            let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
            const enemy = enemies[Math.floor(Math.random() * enemies.length)];
            console.log(chalk.red(`\t# ${enemy} has appeared! #\t`));
            while (enemyHealth > 0) {
                console.log(chalk.yellow(`\tYour HP: ${health}`));
                console.log(chalk.yellow(`\t${enemy}'s HP: ${enemyHealth}`));
                console.log("\n\tWhat would you like to do?");
                console.log("\t1. Attack");
                console.log("\t2. Drink health potion");
                console.log("\t3. Run!");
                const input = prompt(chalk.yellowBright('=>'));
                if (input === "1") {
                    const damageDealt = Math.floor(Math.random() * attackDamage);
                    const damageTaken = Math.floor(Math.random() * enemyAttackDamage);
                    enemyHealth -= damageDealt;
                    health -= damageTaken;
                    console.log(chalk.blueBright(`\t> You strike the ${enemy} for ${damageDealt} damage.`));
                    console.log(chalk.blueBright(`\t> You receive ${damageTaken} in retaliation!`));
                    if (health < 1) {
                        console.log(chalk.redBright("\t> Your have taken too much damage, you are too weak to go on!"));
                        break;
                    }
                }
                else if (input === "2") {
                    if (numHealthPotions > 0) {
                        health += healthPotionHealAmount;
                        numHealthPotions--;
                        console.log(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.`
                            + `\n\t> You have now ${health} HP.`
                            + `\n\t>You have ${numHealthPotions} health potions left.\n`);
                    }
                    else {
                        console.log(chalk.redBright("\t> You have no health potions left! Defeat enemies for a chance to go on."));
                    }
                }
                else if (input === "3") {
                    console.log(chalk.cyan(`\t> You run away from the ${enemy}!`));
                    continue GAME;
                }
                else {
                    console.log(chalk.red("\tInvalid command!"));
                }
            }
            if (health < 1) {
                console.log(chalk.red("You limp out of Dungeon, weak from battle."));
                break;
            }
            console.log(chalk.gray("------------------------------------------------"));
            console.log(chalk.redBright(` # ${enemy} was defeated! #`));
            console.log(chalk.yellow(` # You have ${health} HP left. #`));
            if (Math.random() * 100 < healthPotionDropChance) {
                numHealthPotions++;
                console.log(chalk.yellow(` # The ${enemy} dropped a health potion! #`));
                console.log(chalk.yellow(` # You have ${numHealthPotions} health potion(s). #`));
            }
            console.log(chalk.gray("------------------------------------------------"));
            console.log("What would you like to do now?");
            console.log(chalk.gray("1. Continue fighting"));
            console.log(chalk.gray("2. Exit Dungeon"));
            let input = prompt('=>');
            while (input !== "1" && input !== "2") {
                console.log(chalk.red("Invalid command"));
                input = prompt(chalk.yellowBright('=>'));
            }
            if (input === "1") {
                console.log(chalk.green("You continue on your adventure!"));
            }
            else if (input === "2") {
                console.log(chalk.greenBright("You exit the Dungeon, successful from your adventures!"));
                break;
            }
        }
        console.log("________________________");
        console.log();
        console.log(chalk.green("- THANKS FOR PLAYING! -"));
        console.log("________________________");
    }
}
// Call the main method to start the game
AdventureGame.main();
