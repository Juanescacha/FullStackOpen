ALTER TABLE "blogs" DROP CONSTRAINT "blogs_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reading_list" DROP CONSTRAINT "reading_list_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reading_list" DROP CONSTRAINT "reading_list_blog_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;