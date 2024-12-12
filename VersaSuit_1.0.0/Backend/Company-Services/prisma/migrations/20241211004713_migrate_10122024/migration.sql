BEGIN TRY

BEGIN TRAN;

-- CreateSchema
EXEC sp_executesql N'CREATE SCHEMA [Settings];';;

-- CreateTable
CREATE TABLE [Settings].[City] (
    [CityID] INT NOT NULL,
    [CountryID] INT NOT NULL,
    [nCity] VARCHAR(30) NOT NULL,
    [StateCode] VARCHAR(30) NOT NULL,
    [Timezone] VARCHAR(45) NOT NULL,
    CONSTRAINT [PKc_CountryIDCityID] PRIMARY KEY CLUSTERED ([CountryID],[CityID])
);

-- CreateTable
CREATE TABLE [Settings].[Company] (
    [CompanyID] INT NOT NULL,
    [nCompany] VARCHAR(100) NOT NULL,
    [Abbre] VARCHAR(25) NOT NULL,
    [FiscalNumber] VARCHAR(25) NOT NULL,
    [RLogo] VARBINARY(max),
    [LLogo] VARBINARY(max),
    [PrimaryHeader] VARCHAR(100),
    [SecondaryHeader] VARCHAR(100),
    [PrimaryFooter] VARCHAR(100),
    [SecondaryFooter] VARCHAR(100),
    [HasBranch] BIT NOT NULL,
    [Website] VARCHAR(100),
    [Email] VARCHAR(100),
    [PhoneNumber] INT,
    [UTC_CreateAT] DATETIME CONSTRAINT [DFc_CompanyCreateAtUTC] DEFAULT getutcdate(),
    [GTMM6_CreateAT] DATETIME CONSTRAINT [DFc_CompanyCreateAtGTM] DEFAULT switchoffset(CONVERT([datetimeoffset],getutcdate()),'-06:00'),
    CONSTRAINT [PKc_CompanyID] PRIMARY KEY CLUSTERED ([CompanyID])
);

-- CreateTable
CREATE TABLE [Settings].[CompanyBranch] (
    [CompanyID] INT NOT NULL,
    [BranchID] INT NOT NULL,
    [CityID] INT NOT NULL,
    [CountryID] INT NOT NULL,
    [ManagerID] INT NOT NULL,
    [Address] NVARCHAR(100) NOT NULL,
    [PhoneNumber] INT,
    [ExtNumber] INT,
    [PostalCode] VARCHAR(100) NOT NULL,
    [HasWarehouse] BIT NOT NULL,
    [IsMainBranch] BIT NOT NULL,
    [Latitude] DECIMAL(9,6),
    [Longitude] DECIMAL(9,6),
    CONSTRAINT [PKc_BranchID] PRIMARY KEY CLUSTERED ([CompanyID],[BranchID])
);

-- CreateTable
CREATE TABLE [Settings].[Country] (
    [CountryID] INT NOT NULL,
    [eName] VARCHAR(30) NOT NULL,
    [sName] VARCHAR(30) NOT NULL,
    [Abbreviation] VARCHAR(15) NOT NULL,
    [FlagUrl] VARCHAR(150),
    [Region] VARCHAR(25),
    CONSTRAINT [PKc_Country] PRIMARY KEY CLUSTERED ([CountryID])
);

-- add catalogs
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











-- AddForeignKey
ALTER TABLE [Settings].[City] ADD CONSTRAINT [FK_CountryID_Country] FOREIGN KEY ([CountryID]) REFERENCES [Settings].[Country]([CountryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [Settings].[CompanyBranch] ADD CONSTRAINT [FK_CityID_City] FOREIGN KEY ([CountryID], [CityID]) REFERENCES [Settings].[City]([CountryID],[CityID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [Settings].[CompanyBranch] ADD CONSTRAINT [FK_CompanyID_Company] FOREIGN KEY ([CompanyID]) REFERENCES [Settings].[Company]([CompanyID]) ON DELETE NO ACTION ON UPDATE NO ACTION;






COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
