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
	PhoneNumber		INT					NULL,

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
	[Address]		NVARCHAR(100)	NOT NULL,	
	PhoneNumber		INT				NULL,
	ExtNumber		INT				NULL,
	PostalCode		VARCHAR(100)	NOT NULL,
	HasWarehouse    BIT				NOT NULL,
	IsMainBranch	BIT				NOT NULL,
	Latitude		DECIMAL(9, 6)	NULL,
	Longitude		DECIMAL(9, 6)	NULL,
	CONSTRAINT PKc_BranchID PRIMARY KEY CLUSTERED(CompanyID ASC, BranchID ASC)
)





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




/*
	4- Define the relation between tables
*/
ALTER TABLE Settings.City
ADD CONSTRAINT FK_CountryID_Country FOREIGN KEY(CountryID) REFERENCES Settings.Country(CountryID)
GO
ALTER TABLE Settings.CompanyBranch
ADD CONSTRAINT FK_CompanyID_Company FOREIGN KEY(CompanyID) REFERENCES Settings.Company(CompanyID)
GO
ALTER TABLE Settings.CompanyBranch
ADD CONSTRAINT FK_CityID_City FOREIGN KEY(CountryID, CityID) REFERENCES Settings.City(CountryID, CityID)



/*
	5- Define store procedure
*/
DROP PROCEDURE IF EXISTS dbo.CompanyCreate
GO
CREATE PROCEDURE dbo.CompanyCreate(
	@Message		 NVARCHAR(MAX) OUTPUT,
	@CompanyID		 INT OUTPUT,
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
			SELECT @MaxCompanyID= ISNULL(MAX(CompanyID),0) + 1 FROM Settings.Company
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
					@ManagerID, @Address, NULL, NULL,
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




