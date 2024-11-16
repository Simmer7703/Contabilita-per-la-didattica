-- DropIndex
DROP INDEX "Invite_email_key";

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "role" DROP DEFAULT;
