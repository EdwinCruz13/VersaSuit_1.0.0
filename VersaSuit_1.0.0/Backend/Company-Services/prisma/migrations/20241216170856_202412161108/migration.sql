/*
  Warnings:

  - You are about to alter the column `Address` on the `CompanyBranch` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(100)` to `VarChar(100)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [Settings].[CompanyBranch] ALTER COLUMN [Address] VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE [Settings].[CompanyContact] (
    [ContactID] INT NOT NULL IDENTITY(1,1),
    [CompanyID] INT NOT NULL,
    [PositionContact] VARCHAR(30),
    [PhoneContact] VARCHAR(30) NOT NULL,
    [EmailContact] VARCHAR(30),
    CONSTRAINT [PKc_ContactID] PRIMARY KEY CLUSTERED ([ContactID])
);

-- CreateTable
CREATE TABLE [Settings].[CompanySocialMedia] (
    [MediaID] INT NOT NULL IDENTITY(1,1),
    [CompanyID] INT NOT NULL,
    [nMedia] VARCHAR(30) NOT NULL,
    [UrlMEdia] VARCHAR(150) NOT NULL,
    CONSTRAINT [PKc_MediaID] PRIMARY KEY CLUSTERED ([MediaID])
);

-- AddForeignKey
ALTER TABLE [Settings].[CompanyContact] ADD CONSTRAINT [FK_CompanyID_Contact] FOREIGN KEY ([CompanyID]) REFERENCES [Settings].[Company]([CompanyID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [Settings].[CompanySocialMedia] ADD CONSTRAINT [FK_CompanyID_Media] FOREIGN KEY ([CompanyID]) REFERENCES [Settings].[Company]([CompanyID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
