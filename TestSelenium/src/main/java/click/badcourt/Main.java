package click.badcourt;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Main {
    public static void main(String[] args) {
        // Setup WebDriver
        WebDriverManager.chromedriver().driverVersion("126.0.6478.114").setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Navigate to the login page
            driver.get("http://localhost:5173/login");

            // Find username and password fields
            WebElement usernameField = driver.findElement(By.id("username"));
            WebElement passwordField = driver.findElement(By.id("password"));

            // Enter credentials
            usernameField.sendKeys("owner");
            passwordField.sendKeys("1");

            // Find and click the login button
            WebElement loginButton = driver.findElement(By.className("login-button"));
            loginButton.click();

            // Add a wait to allow time for the login to process
            Thread.sleep(3000);

            // Verify login by checking for a specific element that appears upon successful login
            WebElement loggedInElement = driver.findElement(By.id("loggedInElementId"));
            if (loggedInElement.isDisplayed()) {
                System.out.println("Login successful!");
            } else {
                System.out.println("Login failed!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close the browser
            driver.quit();
        }
    }

}