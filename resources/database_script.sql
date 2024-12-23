USE master
GO
--ALTER DATABASE [VersaSuitDB] SET  SINGLE_USER WITH ROLLBACK IMMEDIATE
--GO

/*
	1- create a database, defining the logic and physical files in the following path C:\DataSQL\Versasuit\
	the mdf and ldf will be in the same path
*/
DROP DATABASE IF EXISTS VersaSuitDB
GO
CREATE DATABASE VersaSuitDB ON(
   NAME = 'VersaSuit_mdf',
   FILENAME = 'C:\DataSQL\Versasuit\VersaSuitDB.mdf',
   SIZE = 10MB,
   MAXSIZE = UNLIMITED,
   FILEGROWTH = 5MB )
LOG ON(
   NAME = 'VersaSuit_log',
   FILENAME = 'C:\DataSQL\Versasuit\VersaSuitDB.ldf',
   SIZE = 5MB,
   MAXSIZE  = UNLIMITED,
   FILEGROWTH = 10MB
)
GO
USE VersaSuitDB
GO

/*
	2- create the next schema in order to organize the tables and
	business logic
*/
DROP SCHEMA IF EXISTS Settings
GO
CREATE SCHEMA Settings;
GO

DROP SCHEMA IF EXISTS Products
GO
CREATE SCHEMA Products;
GO



/*
	3- Define tables and assing the proper schema
*/

DROP TABLE IF EXISTS Settings.Country
GO
CREATE TABLE Settings.Country
(
	CountryID INT NOT NULL,
	eName VARCHAR(30) NOT NULL,
	sName VARCHAR(30) NOT NULL,
	Abbreviation VARCHAR(15) NOT NULL,
	FlagUrl VARCHAR(150) NULL,
	Region VARCHAR(25) NULL,
	CONSTRAINT PKc_Country PRIMARY KEY CLUSTERED(CountryID ASC)
)
GO

DROP TABLE IF EXISTS Settings.City
GO
CREATE TABLE Settings.City
(
	CityID INT NOT NULL,
	CountryID INT NOT NULL,
	nCity VARCHAR(30) NOT NULL,
	StateCode VARCHAR(30) NOT NULL,
	Timezone VARCHAR(45) NOT NULL,
	CONSTRAINT PKc_CountryIDCityID PRIMARY KEY CLUSTERED(CountryID ASC, CityID ASC)
)
GO

-- company is the main table for settings
-- every business will be save here
DROP TABLE IF EXISTS Settings.Company
GO
CREATE TABLE Settings.Company
(
	CompanyID		INT 				NOT NULL,
	nCompany		VARCHAR(100)		NOT NULL,
	Abbre			VARCHAR(25)			NOT NULL,
	FiscalNumber	VARCHAR(25)			NOT NULL,
	RLogo			VARBINARY(MAX)		NULL,
	LLogo			VARBINARY(MAX)		NULL,
	PrimaryHeader   VARCHAR(100)		NULL,
	SecondaryHeader VARCHAR(100)		NULL,
	PrimaryFooter   VARCHAR(100)		NULL,
	SecondaryFooter VARCHAR(100)		NULL,
	HasBranch       BIT					NOT NULL,
	Website			VARCHAR(100)		NULL,
	Email			VARCHAR(100)		NULL,
	PhoneNumber		VARCHAR(30)			NULL,

	UTC_CreateAT		DATETIME		CONSTRAINT DFc_CompanyCreateAtUTC DEFAULT(GETUTCDATE()),
	GTMM6_CreateAT		DATETIME		CONSTRAINT DFc_CompanyCreateAtGTM DEFAULT(SWITCHOFFSET(CONVERT(DATETIMEOFFSET, GETUTCDATE()), '-06:00')) 
	CONSTRAINT PKc_CompanyID PRIMARY KEY CLUSTERED(CompanyID ASC)
)
GO

DROP TABLE IF EXISTS Settings.CompanyBranch
GO
CREATE TABLE Settings.CompanyBranch
(
	CompanyID		INT				NOT NULL,
	BranchID		INT				NOT NULL,
	CityID			INT				NOT NULL,
	CountryID		INT				NOT NULL,
	ManagerID		INT			    NOT NULL,
	[Address]		VARCHAR(100)	NOT NULL,	
	PhoneNumber		VARCHAR(30)		NULL,
	ExtNumber		INT				NULL,
	PostalCode		VARCHAR(100)	NOT NULL,
	HasWarehouse    BIT				NOT NULL,
	IsMainBranch	BIT				NOT NULL,
	Latitude		DECIMAL(9, 6)	NULL,
	Longitude		DECIMAL(9, 6)	NULL,
	CONSTRAINT PKc_BranchID PRIMARY KEY CLUSTERED(CompanyID ASC, BranchID ASC)
)

DROP TABLE IF EXISTS Settings.CompanyContact
GO
CREATE TABLE Settings.CompanyContact
(
	[ContactID] [int] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[nContact] [varchar](30) NULL,
	[PhoneContact] [varchar](30) NOT NULL,
	[EmailContact] [varchar](30) NULL,
    CONSTRAINT [PKc_ContactID] PRIMARY KEY CLUSTERED ([ContactID] ASC)
)
GO

DROP TABLE IF EXISTS Settings.CompanySocialMedia
GO
CREATE TABLE Settings.CompanySocialMedia
(
	[MediaID] [int] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[nMedia] [varchar](30) NOT NULL,
	[UrlMedia] [varchar](150) NOT NULL,
	CONSTRAINT [PKc_MediaID] PRIMARY KEY CLUSTERED ([MediaID] ASC)
)
GO


DROP TABLE IF EXISTS Products.Category
GO
CREATE TABLE Products.Category(
	CategoryID int NOT NULL,
	CompanyID int NOT NULL,
	nCategory varchar(30) NOT NULL,
	[Description] varchar(100) NULL,
	CONSTRAINT [PKc_CategoryID] PRIMARY KEY CLUSTERED(CategoryID ASC, CompanyID ASC)
)
GO

DROP TABLE IF EXISTS Products.SubCategory
GO
CREATE TABLE Products.SubCategory(
	SubCategoryID int NOT NULL,
	CategoryID int NOT NULL,
	CompanyID int NOT NULL,
	nSubCategory varchar(30) NOT NULL,
	[Description] varchar(100) NULL,
	CONSTRAINT [PKc_SubCategoryID] PRIMARY KEY CLUSTERED(SubCategoryID ASC)
)
GO

DROP TABLE IF EXISTS Products.Brand
GO
CREATE TABLE Products.Brand(
	BrandID int NOT NULL,
	CompanyID int NOT NULL,
	nBrand varchar(30) NOT NULL,
	CONSTRAINT [PKc_BrandID] PRIMARY KEY CLUSTERED(CompanyID ASC, BrandID ASC)
)
GO

DROP TABLE IF EXISTS Products.Model
GO
CREATE TABLE Products.Model(
	ModelID int NOT NULL,
	CompanyID int NOT NULL,
	nModel varchar(30) NOT NULL,
	CONSTRAINT [PKc_ModelID] PRIMARY KEY CLUSTERED (CompanyID ASC, ModelID asc)
)
GO


DROP TABLE IF EXISTS Products.Color
GO
CREATE TABLE Products.Color(
	ColorID int NOT NULL,
	nColor varchar(30) NOT NULL,
	Hexadecimal CHAR(7) NOT NULL,
	Red SMALLINT NOT NULL, 
    Green SMALLINT NOT NULL,
    Blue SMALLINT NOT NULL
	CONSTRAINT [PKc_ColorID] PRIMARY KEY CLUSTERED(ColorID ASC)
)
GO

DROP TABLE IF EXISTS Products.UnitMeasure
GO
CREATE TABLE Products.UnitMeasure(
	UnitID int NOT NULL,
	nUnitMeasure varchar(100) NOT NULL,
	nUnitType varchar(50) NOT NULL,
	UnitSymbol varchar(10) NULL
	CONSTRAINT [PKc_UnitID] PRIMARY KEY CLUSTERED(UnitID ASC)
)
GO


DROP TABLE IF EXISTS Products.[Product]
GO
CREATE TABLE Products.[Product](
	ProductID int NOT NULL,
	CompanyID int NOT NULL,
	SubCategoryID int NOT NULL,
	BrandID int NOT NULL,
	ModelID int NOT NULL,
	ColorID int NOT NULL,
	nProduct varchar(250) NOT NULL,
	[Description] varchar(100) NULL,
	ProductNumber varchar(50) NULL,
	ModelNumber varchar(50) NULL,
	Serie varchar(50) NULL,
	Barcode varchar(50) NULL,
	QRCode TEXT NULL,
	Reference varchar(50) NULL,
	SalePrice DECIMAL(18,2) NOT NULL,
	PurchasePrice DECIMAL(18,2) NOT NULL,
	Cost DECIMAL(18,2) NULL,
	CurrentStock INT DEFAULT 0,
	MinimumStock INT DEFAULT 1,
	MaximumStock INT NULL,
	[Status] BIT NOT NULL,
	CreatedAt Datetime DEFAULT GETDATE(),
	CreatedBy int NOT NULL
	CONSTRAINT [PKc_ProductID] PRIMARY KEY CLUSTERED(ProductID ASC, CompanyID ASC)
)
GO


DROP TABLE IF EXISTS Products.[ProductMeasure]
GO
CREATE TABLE Products.[ProductMeasure](
	UnitID int not null,
	CompanyID int NOT NULL,
	ProductID int NOT NULL,
	MeasureValue DECIMAL(18,2) NOT NULL,
	CONSTRAINT [PKc_UnitIDCompanyIDProductID] PRIMARY KEY CLUSTERED(UnitID ASC, CompanyID ASC, ProductID DESC)
)
GO


DROP TABLE IF EXISTS Products.[ProductPhoto]
GO
CREATE TABLE Products.[ProductPhoto](
	PhotoID int not null identity(1,1),
	CompanyID int NOT NULL,
	ProductID int NOT NULL,
	[Name] varchar(100) NOT NULL,
	[Photo] Varbinary(MAX) NULL,
	[UrlPhoto] TEXT NOT NULL,
	isMail BIT NOT NULL,
	CreatedAt Datetime DEFAULT GETDATE(),
	CreatedBy int NULL
	CONSTRAINT [PKc_PhotoID] PRIMARY KEY CLUSTERED(PhotoID DESC)
)
GO


DROP TABLE IF EXISTS Products.[ProductCombo]
GO
CREATE TABLE Products.[ProductCombo](
	ComboID int not null,
	CompanyID int NOT NULL,
	nCombo int NOT NULL,
	CONSTRAINT [PKc_ComboID] PRIMARY KEY CLUSTERED(CompanyID asc, ComboID desc)
)
GO

DROP TABLE IF EXISTS Products.[ProductComboDetail]
GO
CREATE TABLE Products.[ProductComboDetail](
	IdComboDetail int not null identity(1,1),
	ComboID int not null,
	CompanyID int NOT NULL,
	ProductID int NOT NULL,
	PriceCombo decimal(18,2) NOT NULL,
	Amount int NOT NULL,
	[Status] BIT NOT NULL,
	CONSTRAINT [PKc_IdDetail] PRIMARY KEY CLUSTERED(IdComboDetail DESC)
)
GO











/*
	define the references

*/

-- for settings
ALTER TABLE Settings.CompanyBranch
ADD CONSTRAINT FK_CityID_City FOREIGN KEY(CountryID, CityID) REFERENCES Settings.City(CountryID, CityID)
GO

ALTER TABLE Settings.CompanyBranch
ADD CONSTRAINT FK_CompanyID_Company FOREIGN KEY(CompanyID) REFERENCES Settings.Company(CompanyID)
GO
ALTER TABLE Settings.CompanyContact  
ADD  CONSTRAINT [FK_CompanyID_Contact] FOREIGN KEY(CompanyID) REFERENCES  Settings.Company (CompanyID)
GO
ALTER TABLE Settings.CompanySocialMedia  
ADD  CONSTRAINT [FK_CompanyID_Media] FOREIGN KEY(CompanyID) REFERENCES Settings.Company (CompanyID)
GO

-- for products
ALTER TABLE Products.SubCategory  
ADD  CONSTRAINT [FK_CategoryID_SubCategory] FOREIGN KEY(CategoryID, CompanyID) REFERENCES Products.Category (CategoryID, CompanyID)
GO

ALTER TABLE Products.Product  
ADD  CONSTRAINT [FK_SubCategoryID_Product] FOREIGN KEY(SubCategoryID) REFERENCES Products.SubCategory (SubCategoryID)
GO

ALTER TABLE Products.Product  
ADD  CONSTRAINT [FK_BrandID_Brand] FOREIGN KEY(CompanyID, BrandID) REFERENCES Products.Brand (CompanyID, BrandID)
GO

ALTER TABLE Products.Product  
ADD  CONSTRAINT [FK_ColorID_Color] FOREIGN KEY(ColorID) REFERENCES Products.Color (ColorID)
GO

ALTER TABLE Products.Product  
ADD  CONSTRAINT [FK_ModelID_Model] FOREIGN KEY(CompanyID, ModelID) REFERENCES Products.Model (CompanyID, ModelID)
GO

ALTER TABLE Products.ProductMeasure  
ADD  CONSTRAINT [FK_UnitID_UnitMeasure] FOREIGN KEY(UnitID) REFERENCES Products.UnitMeasure (UnitID)
GO

ALTER TABLE Products.ProductMeasure  
ADD  CONSTRAINT [FK_ProductIDCompanyID_UnitMeasure] FOREIGN KEY(ProductID, CompanyID) REFERENCES Products.Product (ProductID, CompanyID)
GO

ALTER TABLE Products.ProductPhoto  
ADD  CONSTRAINT [FK_ProductIDCompanyID_ProductPhoto] FOREIGN KEY(ProductID, CompanyID) REFERENCES Products.Product (ProductID, CompanyID)
GO

ALTER TABLE Products.[ProductComboDetail]  
ADD  CONSTRAINT [FK_ComboIDCompanyID_ProductComboDetail] FOREIGN KEY(CompanyID, ComboID) REFERENCES Products.[ProductCombo] (CompanyID, ComboID)
GO


ALTER TABLE Products.[ProductComboDetail]  
ADD  CONSTRAINT [FK_ProductIDCompanyID_ProductComboDetail] FOREIGN KEY(ProductID, CompanyID) REFERENCES Products.[Product] (ProductID, CompanyID)
GO



/*
	5- Define store procedure
*/
DROP PROCEDURE IF EXISTS dbo.CompanyCreate
GO
CREATE PROCEDURE [dbo].[CompanyCreate](
	@Message		 NVARCHAR(MAX) OUTPUT,
	@CompanyID		 INT OUTPUT,
	@nCompany        NVARCHAR(100),
	@Abbre			 NVARCHAR(25),
	@FiscalNumber	 NVARCHAR(25),
	@Address		 NVARCHAR(100),
	@PhoneNumber	 VARCHAR(30),
	@PostalCode		 NVARCHAR(100),
	@Email			 NVARCHAR(100),
	@Website		 NVARCHAR(100),
	@PrimaryHeader   NVARCHAR(100),
	@SecondaryHeader NVARCHAR(100),
	@PrimaryFooter   NVARCHAR(100),
	@SecondaryFooter NVARCHAR(100),
	@HasBranch       BIT,
	@HasWarehouse	 BIT,
	@CityID			 INT,		
	@CountryID		 INT, 
	@ManagerID		 INT,
	@RLogo			 VARBINARY(MAX) = NULL,
	@LLogo			 VARBINARY(MAX) = NULL,
	@Latitude		 DECIMAL(9,6) = NULL,
	@Longitude		 DECIMAL(9,6) = NULL
)
AS
BEGIN
	SET NOCOUNT ON
	SET DATEFORMAT DMY

	DECLARE @MaxCompanyID INT
	DECLARE @MaxBranchID INT

	BEGIN TRY
		-- initialize transaction
		BEGIN TRANSACTION
			-- validate company
			IF EXISTS(SELECT * FROM Settings.Company WHERE Abbre = @Abbre OR nCompany = @nCompany)
			BEGIN
				SET @Message = 'The company already exists, check the name or abbreviation'
				SET @CompanyID = 0
				COMMIT
				RETURN -- end store procedure abruptly
			END

			----------------------------------------------------------------------------------------------------------------------------
			-- Create the company according the sent params
			----------------------------------------------------------------------------------------------------------------------------
			-- get the max CompanyID
			SET @MaxCompanyID =  dbo.fn_GetCompanyID() -- function that get the max CompanyID or the proper ID
			SELECT @MaxBranchID = ISNULL(MAX(BranchID),0) + 1  FROM settings.CompanyBranch WHERE CompanyID = @MaxCompanyID

			-- insert into company
			INSERT INTO Settings.Company(CompanyID, nCompany,Abbre, FiscalNumber,Website, Email, PhoneNumber,
										 RLogo,LLogo,PrimaryHeader,SecondaryHeader,PrimaryFooter,SecondaryFooter,HasBranch)
			VALUES (@MaxCompanyID, @nCompany, UPPER(@Abbre), @FiscalNumber, @Website, @Email, @PhoneNumber, 
					@RLogo, @LLogo, @PrimaryHeader, @SecondaryHeader, @PrimaryFooter, @SecondaryFooter, @HasBranch)

			-- insert into the branch
			-- as the first record then this branch will be the main branch
			INSERT INTO Settings.CompanyBranch(BranchID, CompanyID, CityID, CountryID,
											   ManagerID, [Address], PhoneNumber, ExtNumber, 
											   PostalCode, 
											   HasWarehouse, IsMainBranch, Latitude, Longitude)
			VALUES (@MaxBranchID, @MaxCompanyID, @CityID, @CountryID, 
					@ManagerID, @Address, @PhoneNumber, NULL,
					@PostalCode, 
					0, 1, @Latitude, @Longitude)


		----------------------------------------------------------------------------------------------------------------------------
		-- execute transaction
		----------------------------------------------------------------------------------------------------------------------------
		COMMIT

		-- set the output
		SET @Message = 'Company has been saved'
		SELECT @CompanyID = CompanyID FROM Settings.Company WHERE Abbre = @Abbre ORDER BY CompanyID DESC 

	END TRY

	BEGIN CATCH
		ROLLBACK
		SELECT @Message = ERROR_MESSAGE()
	END CATCH
END
GO

DROP PROCEDURE IF EXISTS dbo.CompanyUpdate
GO
CREATE PROCEDURE dbo.CompanyUpdate(
	@Message		 NVARCHAR(MAX) OUTPUT,
	@CompanyID		 INT,
	@nCompany        NVARCHAR(100),
	@Abbre			 NVARCHAR(25),
	@FiscalNumber	 NVARCHAR(25),
	@Address		 NVARCHAR(100),
	@PhoneNumber	 INT,
	@PostalCode		 NVARCHAR(100),
	@Email			 NVARCHAR(100),
	@Website		 NVARCHAR(100),
	@PrimaryHeader   NVARCHAR(100),
	@SecondaryHeader NVARCHAR(100),
	@PrimaryFooter   NVARCHAR(100),
	@SecondaryFooter NVARCHAR(100),
	@HasBranch       BIT,
	@HasWarehouse	 BIT,
	@CityID			 INT,		
	@CountryID		 INT, 
	@ManagerID		 INT,
	@RLogo			 VARBINARY(MAX) = NULL,
	@LLogo			 VARBINARY(MAX) = NULL,
	@Latitude		 DECIMAL(9,6) = NULL,
	@Longitude		 DECIMAL(9,6) = NULL
)
AS
BEGIN
	SET NOCOUNT ON
	SET DATEFORMAT DMY

	DECLARE @MainBranchID INT

	BEGIN TRY
		-- initialize transaction
		BEGIN TRANSACTION
			-- validate company
			IF EXISTS(SELECT * FROM Settings.Company WHERE (Abbre = @Abbre OR nCompany = @nCompany) and CompanyID <> @CompanyID)
			BEGIN
				SET @Message = 'The company already exists, check the name or abbreviation'
				SET @CompanyID = 0
				COMMIT
				RETURN -- end store procedure abruptly
			END

			----------------------------------------------------------------------------------------------------------------------------
			-- update the company according the sent params
			----------------------------------------------------------------------------------------------------------------------------

			-- get the main branch, due to we must to change values
			SELECT @MainBranchID = BranchID	FROM settings.CompanyBranch WHERE CompanyID = @CompanyID and IsMainBranch = 1

			-- updating the company
			UPDATE Settings.Company SET     nCompany= @nCompany,Abbre = UPPER(@Abbre), FiscalNumber = @FiscalNumber, 
										    RLogo = @RLogo,LLogo = @LLogo,
											PrimaryHeader = @PrimaryHeader, SecondaryHeader = @SecondaryHeader,
											PrimaryFooter = @PrimaryFooter,SecondaryFooter = @SecondaryFooter,HasBranch = @HasBranch,
											Website = @Website, Email = @Email
			WHERE CompanyID = @CompanyID



			-- update the main branch
			UPDATE Settings.CompanyBranch SET CityID= @CityID, CountryID = @CountryID, 
											  ManagerID = @ManagerID, 
										      [Address] = @Address, PhoneNumber = @PhoneNumber,
											  PostalCode = @PostalCode, HasWarehouse = @HasWarehouse,
											  Latitude = @Latitude, Longitude = @Longitude
			WHERE CompanyID = @CompanyID and BranchID = @MainBranchID



		----------------------------------------------------------------------------------------------------------------------------
		-- execute transaction
		----------------------------------------------------------------------------------------------------------------------------
		COMMIT

		-- set the output
		SET @Message = 'Company has been saved'
		SELECT @CompanyID = CompanyID FROM Settings.Company WHERE CompanyID = @CompanyID ORDER BY CompanyID DESC 

	END TRY

	BEGIN CATCH
		ROLLBACK
		SELECT @Message = ERROR_MESSAGE()
	END CATCH
END
GO

DROP FUNCTION IF EXISTS dbo.fn_GetCompanyID
GO
CREATE FUNCTION dbo.fn_GetCompanyID()
RETURNS INT
AS
BEGIN
	-- this function get the proper ID, 
	-- it will help for ordering it

    DECLARE @MissingId INT;
    DECLARE @MaxId INT;

    -- Determinar el máximo ID actual
    SELECT @MaxId = ISNULL(MAX(CompanyID), 0) FROM Settings.Company;

    -- Buscar el primer ID faltante en la secuencia
    SELECT @MissingId = MIN(ExpectedId)
    FROM (
        SELECT TOP (@MaxId)
            ROW_NUMBER() OVER (ORDER BY CompanyID ASC) AS ExpectedId
        FROM Settings.Company
    ) t
    WHERE NOT EXISTS (SELECT 1 FROM Settings.Company WHERE CompanyID = t.ExpectedId);

    -- Si no hay ningún ID faltante, devolver el siguiente ID consecutivo
    RETURN ISNULL(@MissingId, @MaxId + 1);

	-- select dbo.fn_GetCompanyID() as Id
END;
GO



DECLARE @jsonCountry NVARCHAR(MAX) = '
[
  {
    "CountryID": 1,
    "eName": "Antigua and Barbuda",
    "sName": "Antigua y Barbuda",
    "Abbreviation": "ATG",
    "Flag_url": "https://flagcdn.com/ag.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 2,
    "eName": "Argentina",
    "sName": "Argentina",
    "Abbreviation": "ARG",
    "Flag_url": "https://flagcdn.com/ar.svg",
    "Region": "South America"
  },
  {
    "CountryID": 3,
    "eName": "Bahamas",
    "sName": "Bahamas",
    "Abbreviation": "BHS",
    "Flag_url": "https://flagcdn.com/bs.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 4,
    "eName": "Barbados",
    "sName": "Barbados",
    "Abbreviation": "BRB",
    "Flag_url": "https://flagcdn.com/bb.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 5,
    "eName": "Belize",
    "sName": "Belice",
    "Abbreviation": "BLZ",
    "Flag_url": "https://flagcdn.com/bz.svg",
    "Region": "Central America"
  },
  {
    "CountryID": 6,
    "eName": "Bolivia",
    "sName": "Bolivia",
    "Abbreviation": "BOL",
    "Flag_url": "https://flagcdn.com/bo.svg",
    "Region": "South America"
  },
  {
    "CountryID": 7,
    "eName": "Brazil",
    "sName": "Brasil",
    "Abbreviation": "BRA",
    "Flag_url": "https://flagcdn.com/br.svg",
    "Region": "South America"
  },
  {
    "CountryID": 8,
    "eName": "Canada",
    "sName": "Canadá",
    "Abbreviation": "CAN",
    "Flag_url": "https://flagcdn.com/ca.svg",
    "Region": "North America"
  },
  {
    "CountryID": 9,
    "eName": "Chile",
    "sName": "Chile",
    "Abbreviation": "CHL",
    "Flag_url": "https://flagcdn.com/cl.svg",
    "Region": "South America"
  },
  {
    "CountryID": 10,
    "eName": "Colombia",
    "sName": "Colombia",
    "Abbreviation": "COL",
    "Flag_url": "https://flagcdn.com/co.svg",
    "Region": "South America"
  },
  {
    "CountryID": 11,
    "eName": "Costa Rica",
    "sName": "Costa Rica",
    "Abbreviation": "CRI",
    "Flag_url": "https://flagcdn.com/cr.svg",
    "Region": "Central America"
  },
  {
    "CountryID": 12,
    "eName": "Cuba",
    "sName": "Cuba",
    "Abbreviation": "CUB",
    "Flag_url": "https://flagcdn.com/cu.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 13,
    "eName": "Dominica",
    "sName": "Dominica",
    "Abbreviation": "DMA",
    "Flag_url": "https://flagcdn.com/dm.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 14,
    "eName": "Dominican Republic",
    "sName": "República Dominicana",
    "Abbreviation": "DOM",
    "Flag_url": "https://flagcdn.com/do.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 15,
    "eName": "Ecuador",
    "sName": "Ecuador",
    "Abbreviation": "ECU",
    "Flag_url": "https://flagcdn.com/ec.svg",
    "Region": "South America"
  },
  {
    "CountryID": 16,
    "eName": "El Salvador",
    "sName": "El Salvador",
    "Abbreviation": "SLV",
    "Flag_url": "https://flagcdn.com/sv.svg",
    "Region": "Central America"
  },
  {
    "CountryID": 17,
    "eName": "Grenada",
    "sName": "Granada",
    "Abbreviation": "GRD",
    "Flag_url": "https://flagcdn.com/gd.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 18,
    "eName": "Guatemala",
    "sName": "Guatemala",
    "Abbreviation": "GTM",
    "Flag_url": "https://flagcdn.com/gt.svg",
    "Region": "Central America"
  },
  {
    "CountryID": 19,
    "eName": "Guyana",
    "sName": "Guyana",
    "Abbreviation": "GUY",
    "Flag_url": "https://flagcdn.com/gy.svg",
    "Region": "South America"
  },
  {
    "CountryID": 20,
    "eName": "Haiti",
    "sName": "Haití",
    "Abbreviation": "HTI",
    "Flag_url": "https://flagcdn.com/ht.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 21,
    "eName": "Honduras",
    "sName": "Honduras",
    "Abbreviation": "HND",
    "Flag_url": "https://flagcdn.com/hn.svg",
    "Region": "Central America"
  },
  {
    "CountryID": 22,
    "eName": "Jamaica",
    "sName": "Jamaica",
    "Abbreviation": "JAM",
    "Flag_url": "https://flagcdn.com/jm.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 23,
    "eName": "Mexico",
    "sName": "México",
    "Abbreviation": "MEX",
    "Flag_url": "https://flagcdn.com/mx.svg",
    "Region": "North America"
  },
  {
    "CountryID": 24,
    "eName": "Nicaragua",
    "sName": "Nicaragua",
    "Abbreviation": "NIC",
    "Flag_url": "https://flagcdn.com/ni.svg",
    "Region": "Central America"
  },
  {
    "CountryID": 25,
    "eName": "Panama",
    "sName": "Panamá",
    "Abbreviation": "PAN",
    "Flag_url": "https://flagcdn.com/pa.svg",
    "Region": "Central America"
  },
  {
    "CountryID": 26,
    "eName": "Paraguay",
    "sName": "Paraguay",
    "Abbreviation": "PRY",
    "Flag_url": "https://flagcdn.com/py.svg",
    "Region": "South America"
  },
  {
    "CountryID": 27,
    "eName": "Peru",
    "sName": "Perú",
    "Abbreviation": "PER",
    "Flag_url": "https://flagcdn.com/pe.svg",
    "Region": "South America"
  },
  {
    "CountryID": 28,
    "eName": "Saint Kitts and Nevis",
    "sName": "San Cristóbal y Nieves",
    "Abbreviation": "KNA",
    "Flag_url": "https://flagcdn.com/kn.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 29,
    "eName": "Saint Lucia",
    "sName": "Santa Lucía",
    "Abbreviation": "LCA",
    "Flag_url": "https://flagcdn.com/lc.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 30,
    "eName": "Saint Vincent and the Grenadines",
    "sName": "San Vicente y las Granadinas",
    "Abbreviation": "VCT",
    "Flag_url": "https://flagcdn.com/vc.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 31,
    "eName": "Suriname",
    "sName": "Surinam",
    "Abbreviation": "SUR",
    "Flag_url": "https://flagcdn.com/sr.svg",
    "Region": "South America"
  },
  {
    "CountryID": 32,
    "eName": "Trinidad and Tobago",
    "sName": "Trinidad y Tobago",
    "Abbreviation": "TTO",
    "Flag_url": "https://flagcdn.com/tt.svg",
    "Region": "Caribbean"
  },
  {
    "CountryID": 33,
    "eName": "United States",
    "sName": "Estados Unidos",
    "Abbreviation": "USA",
    "Flag_url": "https://flagcdn.com/us.svg",
    "Region": "North America"
  },
  {
    "CountryID": 34,
    "eName": "Uruguay",
    "sName": "Uruguay",
    "Abbreviation": "URY",
    "Flag_url": "https://flagcdn.com/uy.svg",
    "Region": "South America"
  },
  {
    "CountryID": 35,
    "eName": "Venezuela",
    "sName": "Venezuela",
    "Abbreviation": "VEN",
    "Flag_url": "https://flagcdn.com/ve.svg",
    "Region": "South America"
  }
]
';

DECLARE @jsonCity NVARCHAR(MAX) = '
[
    {
        "CityID": 1,
        "CountryID": 24,
        "nCity": "Managua",
        "StateCode": "MN",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 2,
        "CountryID": 24,
        "nCity": "León",
        "StateCode": "LE",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 3,
        "CountryID": 24,
        "nCity": "Chinandega",
        "StateCode": "CH",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 4,
        "CountryID": 24,
        "nCity": "Granada",
        "StateCode": "GR",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 5,
        "CountryID": 24,
        "nCity": "Masaya",
        "StateCode": "MS",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 6,
        "CountryID": 24,
        "nCity": "Carazo",
        "StateCode": "CA",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 7,
        "CountryID": 24,
        "nCity": "Rivas",
        "StateCode": "RI",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 8,
        "CountryID": 24,
        "nCity": "Matagalpa",
        "StateCode": "MT",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 9,
        "CountryID": 24,
        "nCity": "Jinotega",
        "StateCode": "JN",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 10,
        "CountryID": 24,
        "nCity": "Estelí",
        "StateCode": "ES",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 11,
        "CountryID": 24,
        "nCity": "Nueva Segovia",
        "StateCode": "NS",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 12,
        "CountryID": 24,
        "nCity": "Madriz",
        "StateCode": "MD",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 13,
        "CountryID": 24,
        "nCity": "Boaco",
        "StateCode": "BO",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 14,
        "CountryID": 24,
        "nCity": "Chontales",
        "StateCode": "CHT",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 15,
        "CountryID": 24,
        "nCity": "Río San Juan",
        "StateCode": "RS",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 16,
        "CountryID": 24,
        "nCity": "RAAN",
        "StateCode": "RAAN",
        "Timezone": "GMT-6"
    },
    {
        "CityID": 17,
        "CountryID": 24,
        "nCity": "RAAS",
        "StateCode": "RAAS",
        "Timezone": "GMT-6"
    }
]
';


DECLARE @jsonColor NVARCHAR(MAX) = '
[
  {
    "ColorID": 1,
    "nColor": "White",
    "Hexadecimal": "#FFFFFF",
    "Red": 255,
    "Green": 255,
    "Blue": 255
  },
  {
    "ColorID": 2,
    "nColor": "Black",
    "Hexadecimal": "#000000",
    "Red": 0,
    "Green": 0,
    "Blue": 0
  },
  {
    "ColorID": 3,
    "nColor": "Red",
    "Hexadecimal": "#FF0000",
    "Red": 255,
    "Green": 0,
    "Blue": 0
  },
  {
    "ColorID": 4,
    "nColor": "Green",
    "Hexadecimal": "#00FF00",
    "Red": 0,
    "Green": 255,
    "Blue": 0
  },
  {
    "ColorID": 5,
    "nColor": "Blue",
    "Hexadecimal": "#0000FF",
    "Red": 0,
    "Green": 0,
    "Blue": 255
  },
  {
    "ColorID": 6,
    "nColor": "Yellow",
    "Hexadecimal": "#FFFF00",
    "Red": 255,
    "Green": 255,
    "Blue": 0
  },
  {
    "ColorID": 7,
    "nColor": "Cyan",
    "Hexadecimal": "#00FFFF",
    "Red": 0,
    "Green": 255,
    "Blue": 255
  },
  {
    "ColorID": 8,
    "nColor": "Magenta",
    "Hexadecimal": "#FF00FF",
    "Red": 255,
    "Green": 0,
    "Blue": 255
  },
  {
    "ColorID": 9,
    "nColor": "Orange",
    "Hexadecimal": "#FFA500",
    "Red": 255,
    "Green": 165,
    "Blue": 0
  },
  {
    "ColorID": 10,
    "nColor": "Purple",
    "Hexadecimal": "#800080",
    "Red": 128,
    "Green": 0,
    "Blue": 128
  },
  {
    "ColorID": 11,
    "nColor": "Brown",
    "Hexadecimal": "#A52A2A",
    "Red": 165,
    "Green": 42,
    "Blue": 42
  },
  {
    "ColorID": 12,
    "nColor": "Gray",
    "Hexadecimal": "#808080",
    "Red": 128,
    "Green": 128,
    "Blue": 128
  },
  {
    "ColorID": 13,
    "nColor": "Pink",
    "Hexadecimal": "#FFC0CB",
    "Red": 255,
    "Green": 192,
    "Blue": 203
  },
  {
    "ColorID": 14,
    "nColor": "Lime",
    "Hexadecimal": "#00FF00",
    "Red": 0,
    "Green": 255,
    "Blue": 0
  },
  {
    "ColorID": 15,
    "nColor": "Indigo",
    "Hexadecimal": "#4B0082",
    "Red": 75,
    "Green": 0,
    "Blue": 130
  },
  {
    "ColorID": 16,
    "nColor": "Violet",
    "Hexadecimal": "#8A2BE2",
    "Red": 138,
    "Green": 43,
    "Blue": 226
  },
  {
    "ColorID": 17,
    "nColor": "Teal",
    "Hexadecimal": "#008080",
    "Red": 0,
    "Green": 128,
    "Blue": 128
  },
  {
    "ColorID": 18,
    "nColor": "Turquoise",
    "Hexadecimal": "#40E0D0",
    "Red": 64,
    "Green": 224,
    "Blue": 208
  },
  {
    "ColorID": 19,
    "nColor": "Gold",
    "Hexadecimal": "#FFD700",
    "Red": 255,
    "Green": 215,
    "Blue": 0
  },
  {
    "ColorID": 20,
    "nColor": "Salmon",
    "Hexadecimal": "#FA8072",
    "Red": 250,
    "Green": 128,
    "Blue": 114
  },
  {
    "ColorID": 21,
    "nColor": "Beige",
    "Hexadecimal": "#F5F5DC",
    "Red": 245,
    "Green": 245,
    "Blue": 220
  },
  {
    "ColorID": 22,
    "nColor": "Lavender",
    "Hexadecimal": "#E6E6FA",
    "Red": 230,
    "Green": 230,
    "Blue": 250
  },
  {
    "ColorID": 23,
    "nColor": "Chocolate",
    "Hexadecimal": "#D2691E",
    "Red": 210,
    "Green": 105,
    "Blue": 30
  },
  {
    "ColorID": 24,
    "nColor": "Khaki",
    "Hexadecimal": "#F0E68C",
    "Red": 240,
    "Green": 230,
    "Blue": 140
  },
  {
    "ColorID": 25,
    "nColor": "Coral",
    "Hexadecimal": "#FF7F50",
    "Red": 255,
    "Green": 127,
    "Blue": 80
  },
  {
    "ColorID": 26,
    "nColor": "Navy",
    "Hexadecimal": "#000080",
    "Red": 0,
    "Green": 0,
    "Blue": 128
  },
  {
    "ColorID": 27,
    "nColor": "Maroon",
    "Hexadecimal": "#800000",
    "Red": 128,
    "Green": 0,
    "Blue": 0
  },
  {
    "ColorID": 28,
    "nColor": "Olive",
    "Hexadecimal": "#808000",
    "Red": 128,
    "Green": 128,
    "Blue": 0
  },
  {
    "ColorID": 29,
    "nColor": "Ivory",
    "Hexadecimal": "#FFFFF0",
    "Red": 255,
    "Green": 255,
    "Blue": 240
  },
  {
    "ColorID": 30,
    "nColor": "Aquamarine",
    "Hexadecimal": "#7FFFD4",
    "Red": 127,
    "Green": 255,
    "Blue": 212
  },
  {
    "ColorID": 31,
    "nColor": "Peach",
    "Hexadecimal": "#FFDAB9",
    "Red": 255,
    "Green": 218,
    "Blue": 185
  },
  {
    "ColorID": 32,
    "nColor": "SlateGray",
    "Hexadecimal": "#708090",
    "Red": 112,
    "Green": 128,
    "Blue": 144
  },
  {
    "ColorID": 33,
    "nColor": "Plum",
    "Hexadecimal": "#DDA0DD",
    "Red": 221,
    "Green": 160,
    "Blue": 221
  },
  {
    "ColorID": 34,
    "nColor": "Orchid",
    "Hexadecimal": "#DA70D6",
    "Red": 218,
    "Green": 112,
    "Blue": 214
  },
  {
    "ColorID": 35,
    "nColor": "Mint",
    "Hexadecimal": "#98FF98",
    "Red": 152,
    "Green": 255,
    "Blue": 152
  },
  {
    "ColorID": 36,
    "nColor": "Crimson",
    "Hexadecimal": "#DC143C",
    "Red": 220,
    "Green": 20,
    "Blue": 60
  },
  {
    "ColorID": 37,
    "nColor": "Seashell",
    "Hexadecimal": "#FFF5EE",
    "Red": 255,
    "Green": 245,
    "Blue": 238
  },
  {
    "ColorID": 38,
    "nColor": "Snow",
    "Hexadecimal": "#FFFAFA",
    "Red": 255,
    "Green": 250,
    "Blue": 250
  },
  {
    "ColorID": 39,
    "nColor": "Azure",
    "Hexadecimal": "#F0FFFF",
    "Red": 240,
    "Green": 255,
    "Blue": 255
  },
  {
    "ColorID": 40,
    "nColor": "SkyBlue",
    "Hexadecimal": "#87CEEB",
    "Red": 135,
    "Green": 206,
    "Blue": 235
  },
  {
    "ColorID": 41,
    "nColor": "Blush",
    "Hexadecimal": "#DE5D83",
    "Red": 222,
    "Green": 93,
    "Blue": 131
  },
  {
    "ColorID": 42,
    "nColor": "ForestGreen",
    "Hexadecimal": "#228B22",
    "Red": 34,
    "Green": 139,
    "Blue": 34
  },
  {
    "ColorID": 43,
    "nColor": "Tomato",
    "Hexadecimal": "#FF6347",
    "Red": 255,
    "Green": 99,
    "Blue": 71
  },
  {
    "ColorID": 44,
    "nColor": "Wheat",
    "Hexadecimal": "#F5DEB3",
    "Red": 245,
    "Green": 222,
    "Blue": 179
  },
  {
    "ColorID": 45,
    "nColor": "Linen",
    "Hexadecimal": "#FAF0E6",
    "Red": 250,
    "Green": 240,
    "Blue": 230
  },
  {
    "ColorID": 46,
    "nColor": "Peru",
    "Hexadecimal": "#CD853F",
    "Red": 205,
    "Green": 133,
    "Blue": 63
  },
  {
    "ColorID": 47,
    "nColor": "Sienna",
    "Hexadecimal": "#A0522D",
    "Red": 160,
    "Green": 82,
    "Blue": 45
  },
  {
    "ColorID": 48,
    "nColor": "DarkSlateGray",
    "Hexadecimal": "#2F4F4F",
    "Red": 47,
    "Green": 79,
    "Blue": 79
  },
  {
    "ColorID": 49,
    "nColor": "RosyBrown",
    "Hexadecimal": "#BC8F8F",
    "Red": 188,
    "Green": 143,
    "Blue": 143
  },
  {
    "ColorID": 50,
    "nColor": "PowderBlue",
    "Hexadecimal": "#B0E0E6",
    "Red": 176,
    "Green": 224,
    "Blue": 230
  }
]

'

DECLARE @jsonUnitMeasure NVARCHAR(MAX) = '
[
  { "UnitID": 1, "nUnitMeasure": "Kilogram", "nUnitType": "Weight", "UnitSymbol": "kg" },
  { "UnitID": 2, "nUnitMeasure": "Gram", "nUnitType": "Weight", "UnitSymbol": "g" },
  { "UnitID": 3, "nUnitMeasure": "Milligram", "nUnitType": "Weight", "UnitSymbol": "mg" },
  { "UnitID": 4, "nUnitMeasure": "Liter", "nUnitType": "Volume", "UnitSymbol": "lt" },
  { "UnitID": 5, "nUnitMeasure": "Milliliter", "nUnitType": "Volume", "UnitSymbol": "ml" },
  { "UnitID": 6, "nUnitMeasure": "Cubic Meter", "nUnitType": "Volume", "UnitSymbol": "m³" },
  { "UnitID": 7, "nUnitMeasure": "Square Meter", "nUnitType": "Area", "UnitSymbol": "m²" },
  { "UnitID": 8, "nUnitMeasure": "Square Foot", "nUnitType": "Area", "UnitSymbol": "ft²" },
  { "UnitID": 9, "nUnitMeasure": "Meter", "nUnitType": "Length", "UnitSymbol": "m" },
  { "UnitID": 10, "nUnitMeasure": "Centimeter", "nUnitType": "Length", "UnitSymbol": "cm" },
  { "UnitID": 11, "nUnitMeasure": "Millimeter", "nUnitType": "Length", "UnitSymbol": "mm" },
  { "UnitID": 12, "nUnitMeasure": "Foot", "nUnitType": "Length", "UnitSymbol": "ft" },
  { "UnitID": 13, "nUnitMeasure": "Inch", "nUnitType": "Length", "UnitSymbol": "in" },
  { "UnitID": 14, "nUnitMeasure": "Pound", "nUnitType": "Weight", "UnitSymbol": "lb" },
  { "UnitID": 15, "nUnitMeasure": "Ounce", "nUnitType": "Weight", "UnitSymbol": "oz" },
  { "UnitID": 16, "nUnitMeasure": "Gallon", "nUnitType": "Volume", "UnitSymbol": "gal" },
  { "UnitID": 17, "nUnitMeasure": "Quart", "nUnitType": "Volume", "UnitSymbol": "qt" },
  { "UnitID": 18, "nUnitMeasure": "Cup", "nUnitType": "Volume", "UnitSymbol": "cup" },
  { "UnitID": 19, "nUnitMeasure": "Tablespoon", "nUnitType": "Volume", "UnitSymbol": "tbsp" },
  { "UnitID": 20, "nUnitMeasure": "Teaspoon", "nUnitType": "Volume", "UnitSymbol": "tsp" },
  { "UnitID": 21, "nUnitMeasure": "Kilometer", "nUnitType": "Length", "UnitSymbol": "km" },
  { "UnitID": 22, "nUnitMeasure": "Yard", "nUnitType": "Length", "UnitSymbol": "yd" },
  { "UnitID": 23, "nUnitMeasure": "Ton", "nUnitType": "Weight", "UnitSymbol": "t" },
  { "UnitID": 24, "nUnitMeasure": "Millisecond", "nUnitType": "Time", "UnitSymbol": "ms" },
  { "UnitID": 25, "nUnitMeasure": "Second", "nUnitType": "Time", "UnitSymbol": "s" },
  { "UnitID": 26, "nUnitMeasure": "Minute", "nUnitType": "Time", "UnitSymbol": "min" },
  { "UnitID": 27, "nUnitMeasure": "Hour", "nUnitType": "Time", "UnitSymbol": "h" },
  { "UnitID": 28, "nUnitMeasure": "Day", "nUnitType": "Time", "UnitSymbol": "d" },
  { "UnitID": 29, "nUnitMeasure": "Week", "nUnitType": "Time", "UnitSymbol": "wk" },
  { "UnitID": 30, "nUnitMeasure": "Month", "nUnitType": "Time", "UnitSymbol": "mo" },
  { "UnitID": 31, "nUnitMeasure": "Year", "nUnitType": "Time", "UnitSymbol": "yr" },
  { "UnitID": 32, "nUnitMeasure": "Pack", "nUnitType": "Count", "UnitSymbol": "pk" },
  { "UnitID": 33, "nUnitMeasure": "Unit", "nUnitType": "Count", "UnitSymbol": "u" },
  { "UnitID": 34, "nUnitMeasure": "Box", "nUnitType": "Count", "UnitSymbol": "bx" },
  { "UnitID": 35, "nUnitMeasure": "Can", "nUnitType": "Count", "UnitSymbol": "cn" },
  { "UnitID": 36, "nUnitMeasure": "Bottle", "nUnitType": "Count", "UnitSymbol": "bt" },
  { "UnitID": 37, "nUnitMeasure": "Roll", "nUnitType": "Count", "UnitSymbol": "rl" },
  { "UnitID": 38, "nUnitMeasure": "Piece", "nUnitType": "Count", "UnitSymbol": "pc" },
  { "UnitID": 39, "nUnitMeasure": "Bag", "nUnitType": "Count", "UnitSymbol": "bag" },
  { "UnitID": 40, "nUnitMeasure": "Set", "nUnitType": "Count", "UnitSymbol": "set" },
  { "UnitID": 41, "nUnitMeasure": "Bundle", "nUnitType": "Count", "UnitSymbol": "bndl" },
  { "UnitID": 42, "nUnitMeasure": "Carton", "nUnitType": "Count", "UnitSymbol": "ctn" },
  { "UnitID": 43, "nUnitMeasure": "Sheet", "nUnitType": "Count", "UnitSymbol": "sht" },
  { "UnitID": 44, "nUnitMeasure": "Ream", "nUnitType": "Count", "UnitSymbol": "rm" },
  { "UnitID": 45, "nUnitMeasure": "Block", "nUnitType": "Count", "UnitSymbol": "blk" },
  { "UnitID": 46, "nUnitMeasure": "Rod", "nUnitType": "Length", "UnitSymbol": "rod" },
  { "UnitID": 47, "nUnitMeasure": "Barrel", "nUnitType": "Volume", "UnitSymbol": "bbl" },
  { "UnitID": 48, "nUnitMeasure": "Pint", "nUnitType": "Volume", "UnitSymbol": "pt" },
  { "UnitID": 49, "nUnitMeasure": "Dozen", "nUnitType": "Quantity", "UnitSymbol": "doz" },
  { "UnitID": 50, "nUnitMeasure": "Ampere", "nUnitType": "Electricity", "UnitSymbol": "A" },
  { "UnitID": 51, "nUnitMeasure": "Volt", "nUnitType": "Electricity", "UnitSymbol": "V" },
  { "UnitID": 52, "nUnitMeasure": "Watt", "nUnitType": "Electricity", "UnitSymbol": "W" },
  { "UnitID": 53, "nUnitMeasure": "Kilowatt", "nUnitType": "Electricity", "UnitSymbol": "kW" },
  { "UnitID": 54, "nUnitMeasure": "Joule", "nUnitType": "Energy", "UnitSymbol": "J" },
  { "UnitID": 55, "nUnitMeasure": "Calorie", "nUnitType": "Energy", "UnitSymbol": "cal" },
  { "UnitID": 56, "nUnitMeasure": "Kilocalorie", "nUnitType": "Energy", "UnitSymbol": "kcal" },
  { "UnitID": 57, "nUnitMeasure": "Newton", "nUnitType": "Force", "UnitSymbol": "N" },
  { "UnitID": 58, "nUnitMeasure": "Pascal", "nUnitType": "Pressure", "UnitSymbol": "Pa" },
  { "UnitID": 59, "nUnitMeasure": "Bar", "nUnitType": "Pressure", "UnitSymbol": "bar" },
  { "UnitID": 60, "nUnitMeasure": "Psi", "nUnitType": "Pressure", "UnitSymbol": "psi" },
  { "UnitID": 61, "nUnitMeasure": "Degree Celsius", "nUnitType": "Temperature", "UnitSymbol": "°C" },
  { "UnitID": 62, "nUnitMeasure": "Degree Fahrenheit", "nUnitType": "Temperature", "UnitSymbol": "°F" },
  { "UnitID": 63, "nUnitMeasure": "Kelvin", "nUnitType": "Temperature", "UnitSymbol": "K" },
  { "UnitID": 64, "nUnitMeasure": "Hectare", "nUnitType": "Area", "UnitSymbol": "ha" },
  { "UnitID": 65, "nUnitMeasure": "Acre", "nUnitType": "Area", "UnitSymbol": "ac" },
  { "UnitID": 66, "nUnitMeasure": "Cubic Inch", "nUnitType": "Volume", "UnitSymbol": "in³" },
  { "UnitID": 67, "nUnitMeasure": "Cubic Foot", "nUnitType": "Volume", "UnitSymbol": "ft³" },
  { "UnitID": 68, "nUnitMeasure": "Microliter", "nUnitType": "Volume", "UnitSymbol": "µl" },
  { "UnitID": 69, "nUnitMeasure": "Nanometer", "nUnitType": "Length", "UnitSymbol": "nm" },
  { "UnitID": 70, "nUnitMeasure": "Micrometer", "nUnitType": "Length", "UnitSymbol": "µm" },
  { "UnitID": 71, "nUnitMeasure": "Lux", "nUnitType": "Illumination", "UnitSymbol": "lx" },
  { "UnitID": 72, "nUnitMeasure": "Candela", "nUnitType": "Illumination", "UnitSymbol": "cd" },
  { "UnitID": 73, "nUnitMeasure": "Lumen", "nUnitType": "Illumination", "UnitSymbol": "lm" },
  { "UnitID": 74, "nUnitMeasure": "Horsepower", "nUnitType": "Power", "UnitSymbol": "hp" },
  { "UnitID": 75, "nUnitMeasure": "Kilojoule", "nUnitType": "Energy", "UnitSymbol": "kJ" },
  { "UnitID": 76, "nUnitMeasure": "Megajoule", "nUnitType": "Energy", "UnitSymbol": "MJ" },
  { "UnitID": 77, "nUnitMeasure": "Terabyte", "nUnitType": "Data", "UnitSymbol": "TB" },
  { "UnitID": 78, "nUnitMeasure": "Gigabyte", "nUnitType": "Data", "UnitSymbol": "GB" },
  { "UnitID": 79, "nUnitMeasure": "Megabyte", "nUnitType": "Data", "UnitSymbol": "MB" },
  { "UnitID": 80, "nUnitMeasure": "Kilobyte", "nUnitType": "Data", "UnitSymbol": "KB" },
  { "UnitID": 81, "nUnitMeasure": "Byte", "nUnitType": "Data", "UnitSymbol": "B" },
  { "UnitID": 82, "nUnitMeasure": "Torr", "nUnitType": "Pressure", "UnitSymbol": "Torr" },
  { "UnitID": 83, "nUnitMeasure": "Newton", "nUnitType": "Force", "UnitSymbol": "N" },
  { "UnitID": 84, "nUnitMeasure": "Kilonewton", "nUnitType": "Force", "UnitSymbol": "kN" },
  { "UnitID": 85, "nUnitMeasure": "Dyne", "nUnitType": "Force", "UnitSymbol": "dyn" },
  { "UnitID": 86, "nUnitMeasure": "Coulomb", "nUnitType": "Electric Charge", "UnitSymbol": "C" },
  { "UnitID": 87, "nUnitMeasure": "Ampere-Hour", "nUnitType": "Electric Charge", "UnitSymbol": "Ah" },
  { "UnitID": 88, "nUnitMeasure": "Electronvolt", "nUnitType": "Energy", "UnitSymbol": "eV" },
  { "UnitID": 89, "nUnitMeasure": "Gigawatt", "nUnitType": "Power", "UnitSymbol": "GW" },
  { "UnitID": 90, "nUnitMeasure": "Ohm", "nUnitType": "Electric Resistance", "UnitSymbol": "Ω" },
  { "UnitID": 91, "nUnitMeasure": "Siemens", "nUnitType": "Electric Conductance", "UnitSymbol": "S" },
  { "UnitID": 92, "nUnitMeasure": "Farad", "nUnitType": "Electric Capacitance", "UnitSymbol": "F" },
  { "UnitID": 93, "nUnitMeasure": "Weber", "nUnitType": "Magnetic Flux", "UnitSymbol": "Wb" },
  { "UnitID": 94, "nUnitMeasure": "Tesla", "nUnitType": "Magnetic Field Strength", "UnitSymbol": "T" },
  { "UnitID": 95, "nUnitMeasure": "Henry", "nUnitType": "Inductance", "UnitSymbol": "H" },
  { "UnitID": 96, "nUnitMeasure": "Kelvin", "nUnitType": "Temperature", "UnitSymbol": "K" },
  { "UnitID": 97, "nUnitMeasure": "Rankine", "nUnitType": "Temperature", "UnitSymbol": "°R" },
  { "UnitID": 98, "nUnitMeasure": "Calorie", "nUnitType": "Energy", "UnitSymbol": "cal" },
  { "UnitID": 99, "nUnitMeasure": "British Thermal Unit", "nUnitType": "Energy", "UnitSymbol": "BTU" },
  { "UnitID": 100, "nUnitMeasure": "Micron", "nUnitType": "Length", "UnitSymbol": "µm" },
  { "UnitID": 101, "nUnitMeasure": "Carat", "nUnitType": "Weight", "UnitSymbol": "ct" },
  { "UnitID": 102, "nUnitMeasure": "Nautical Mile", "nUnitType": "Length", "UnitSymbol": "NM" }
 ]
'


INSERT INTO Settings.Country
SELECT * FROM OPENJSON(@jsonCountry)
WITH (
    CountryID INT '$.CountryID',
    eName NVARCHAR(30) '$.eName',
    sName NVARCHAR(30) '$.sName',
	Abbreviation NVARCHAR(30) '$.Abbreviation',
	Flag_url NVARCHAR(150) '$.Flag_url',
	Region NVARCHAR(30) '$.Region'
);


INSERT INTO Settings.City
SELECT * FROM OPENJSON(@jsonCity)
WITH (
	CityID INT '$.CityID',
    CountryID INT '$.CountryID',
    nCity NVARCHAR(30) '$.nCity',
    StateCode NVARCHAR(30) '$.StateCode',
	Timezone NVARCHAR(30) '$.Timezone'
);


INSERT INTO Products.Color
SELECT * FROM OPENJSON(@jsonColor)
WITH (
	ColorID INT '$.ColorID',
    nColor VARCHAR(50) '$.nColor',
    Hexadecimal CHAR(7) '$.Hexadecimal',
    Red INT '$.Red',
	Green INT '$.Green',
	Blue INT '$.Blue'
);


INSERT INTO Products.UnitMeasure
SELECT * FROM OPENJSON(@jsonUnitMeasure)
WITH (
	UnitID INT '$.UnitID',
    nUnitMeasure VARCHAR(50) '$.nUnitMeasure',
    nUnitType VARCHAR(50) '$.nUnitType',
    UnitSymbol VARCHAR(50) '$.UnitSymbol'
);





/*
	4- Define the relation between tables
*/
ALTER TABLE Settings.City
ADD CONSTRAINT FK_CountryID_Country FOREIGN KEY(CountryID) REFERENCES Settings.Country(CountryID)
GO




