-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthLog" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AuthLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Browser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Browser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnBrowsers" (
    "userId" INTEGER NOT NULL,
    "browserId" INTEGER NOT NULL,

    CONSTRAINT "UserOnBrowsers_pkey" PRIMARY KEY ("userId","browserId")
);

-- CreateTable
CREATE TABLE "AuthLogOnBrowsers" (
    "authLogId" INTEGER NOT NULL,
    "browserId" INTEGER NOT NULL,

    CONSTRAINT "AuthLogOnBrowsers_pkey" PRIMARY KEY ("authLogId","browserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AuthLog" ADD CONSTRAINT "AuthLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnBrowsers" ADD CONSTRAINT "UserOnBrowsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnBrowsers" ADD CONSTRAINT "UserOnBrowsers_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthLogOnBrowsers" ADD CONSTRAINT "AuthLogOnBrowsers_authLogId_fkey" FOREIGN KEY ("authLogId") REFERENCES "AuthLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthLogOnBrowsers" ADD CONSTRAINT "AuthLogOnBrowsers_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "Browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
