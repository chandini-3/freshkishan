# Farmer Marketplace Deployment Guide

## Overview
This guide will help you deploy the comprehensive Farmer Marketplace system alongside your existing gardening website on Apache Tomcat.

## Prerequisites
- ✅ Apache Tomcat 10.1 (already running on your system)
- ✅ MySQL Database (5.7+ or 8.0+)
- ✅ Java 11+ (for servlet compilation)
- ✅ MySQL Connector JAR (already in your lib folder)

## Deployment Steps

### 1. Database Setup

#### Option A: Command Line (Recommended)
```bash
# Connect to MySQL
mysql -u root -p

# Run the database setup script
source c:/gar/farmer-marketplace-db.sql

# Verify database creation
SHOW DATABASES;
USE farmer_marketplace;
SHOW TABLES;
```

#### Option B: MySQL Workbench
1. Open MySQL Workbench
2. Connect to your local MySQL instance
3. Open the file `farmer-marketplace-db.sql`
4. Execute the script (click the lightning bolt icon)

### 2. Prepare Tomcat Deployment

#### Create Marketplace Web Application
```powershell
# Navigate to Tomcat webapps directory
cd "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps"

# Create new application directory
mkdir farmer-marketplace

# Copy marketplace files
copy c:\gar\farmer-marketplace.html "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\index.html"
copy c:\gar\farmer-marketplace.css "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\farmer-marketplace.css"
copy c:\gar\farmer-marketplace.js "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\farmer-marketplace.js"
```

#### Create WEB-INF Structure
```powershell
# Create WEB-INF directory structure
mkdir "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\WEB-INF"
mkdir "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\WEB-INF\classes"
mkdir "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\WEB-INF\lib"

# Copy MySQL connector
copy c:\gar\lib\mysql-connector-j-9.2.0.jar "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\WEB-INF\lib\"
```

### 3. Create web.xml Configuration

Create the file: `C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\WEB-INF\web.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
         https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">

    <display-name>Farmer Marketplace</display-name>
    <description>Agricultural Trading Platform</description>

    <!-- Database Configuration -->
    <context-param>
        <param-name>db.url</param-name>
        <param-value>jdbc:mysql://localhost:3306/farmer_marketplace?useSSL=false&amp;allowPublicKeyRetrieval=true&amp;serverTimezone=UTC</param-value>
    </context-param>
    <context-param>
        <param-name>db.username</param-name>
        <param-value>root</param-value>
    </context-param>
    <context-param>
        <param-name>db.password</param-name>
        <param-value>your_mysql_password</param-value>
    </context-param>

    <!-- Welcome File List -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>

    <!-- Error Pages -->
    <error-page>
        <error-code>404</error-code>
        <location>/error/404.html</location>
    </error-page>
    <error-page>
        <error-code>500</error-code>
        <location>/error/500.html</location>
    </error-page>

    <!-- Session Configuration -->
    <session-config>
        <session-timeout>30</session-timeout>
    </session-config>

</web-app>
```

### 4. Compile Java Database Utility

```powershell
# Navigate to your source directory
cd c:\gar

# Compile the Java class (adjust classpath as needed)
javac -cp "lib\mysql-connector-j-9.2.0.jar;C:\Program Files\Apache Software Foundation\Tomcat 10.1\lib\servlet-api.jar" -d "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\farmer-marketplace\WEB-INF\classes" FarmerMarketplaceDB.java
```

### 5. Start/Restart Tomcat

```powershell
# Stop Tomcat
cd "C:\Program Files\Apache Software Foundation\Tomcat 10.1\bin"
.\shutdown.bat

# Start Tomcat
.\startup.bat
```

### 6. Access the Applications

#### Original Gardening Website
- URL: http://localhost:9090/gar/index.html
- Status: ✅ Already working

#### New Farmer Marketplace
- URL: http://localhost:9090/farmer-marketplace/
- Features: Complete agricultural trading platform

## Testing the Deployment

### 1. Database Verification
```sql
-- Check if database and tables exist
USE farmer_marketplace;
SHOW TABLES;

-- Verify sample data
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as product_count FROM products;
SELECT COUNT(*) as category_count FROM product_categories;
```

### 2. Application Testing
1. Open browser and navigate to: http://localhost:9090/farmer-marketplace/
2. Test user registration and login functionality
3. Browse product catalog
4. Test search and filter features
5. Check mobile responsiveness

### 3. Browser Console Check
- Open Developer Tools (F12)
- Check for any JavaScript errors in Console tab
- Verify all CSS and JS files are loading correctly

## Configuration Updates

### Database Connection
Update the database password in `web.xml`:
```xml
<context-param>
    <param-name>db.password</param-name>
    <param-value>YOUR_ACTUAL_MYSQL_PASSWORD</param-value>
</context-param>
```

### Production Deployment
For production, consider:
1. **SSL/HTTPS**: Enable SSL certificates
2. **Database Security**: Create dedicated database user with limited privileges
3. **File Upload**: Configure file upload directory for product images
4. **Email Configuration**: Set up SMTP for notifications
5. **Payment Gateway**: Integrate payment processing
6. **SMS Gateway**: Set up SMS notifications

## File Structure After Deployment

```
Tomcat 10.1/
├── webapps/
│   ├── gar/                          # Original gardening website
│   │   ├── index.html
│   │   ├── [all existing files]
│   │   └── ...
│   └── farmer-marketplace/           # New marketplace application
│       ├── index.html                # Main marketplace page
│       ├── farmer-marketplace.css    # Styles
│       ├── farmer-marketplace.js     # JavaScript functionality
│       └── WEB-INF/
│           ├── web.xml              # Configuration
│           ├── classes/
│           │   └── FarmerMarketplaceDB.class
│           └── lib/
│               └── mysql-connector-j-9.2.0.jar
```

## Integration Options

### Option 1: Standalone Deployment (Recommended)
- Keep as separate application at `/farmer-marketplace/`
- Independent database and functionality
- Easier maintenance and updates

### Option 2: Integrated with Existing Site
- Add marketplace as section of existing gardening site
- Share common header/footer
- Unified user experience

### Option 3: Subdomain Deployment
- Deploy at `marketplace.yourdomain.com`
- Professional separation
- Better SEO and branding

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
- Check MySQL service is running
- Verify database credentials in web.xml
- Ensure MySQL port 3306 is accessible

#### 2. 404 Error on Marketplace
- Verify Tomcat is running on correct port
- Check file permissions
- Ensure all files are copied correctly

#### 3. JavaScript Errors
- Check browser console for specific errors
- Verify all .js and .css files are accessible
- Check for CORS issues

#### 4. Compilation Errors
- Verify Java classpath includes all required JARs
- Check Java version compatibility
- Ensure proper servlet API version

### Debug Commands

```powershell
# Check Tomcat status
netstat -an | findstr 9090

# Check Tomcat logs
type "C:\Program Files\Apache Software Foundation\Tomcat 10.1\logs\catalina.out"

# Test MySQL connection
mysql -u root -p -e "USE farmer_marketplace; SELECT COUNT(*) FROM users;"
```

## Next Steps

1. **Test the deployment** following the testing guide above
2. **Customize the marketplace** with your branding and requirements
3. **Add more features** like:
   - Image upload for products
   - Payment gateway integration
   - SMS/Email notifications
   - Advanced search and filters
   - Mobile app development
4. **Set up production environment** with proper security and performance optimization

## Support

If you encounter any issues during deployment:
1. Check the Tomcat logs for error details
2. Verify all file paths and permissions
3. Test database connectivity separately
4. Use browser developer tools to debug frontend issues

The farmer marketplace is now ready for deployment alongside your existing gardening website! 🌾🚜

---
**Note**: Remember to replace `YOUR_ACTUAL_MYSQL_PASSWORD` with your actual MySQL root password in the web.xml configuration.
