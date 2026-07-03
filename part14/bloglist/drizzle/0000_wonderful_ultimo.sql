CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"url" text NOT NULL,
	"likes" integer DEFAULT 0
);
