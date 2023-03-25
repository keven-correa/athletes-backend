SELECT "user"."id" AS "user_id",
       "user"."firstName" AS "user_firstName",
       "user"."lastName" AS "user_lastName",
       "user"."email" AS "user_email",
       "user"."isActive" AS "user_isActive",
       "user"."role" AS "user_role",
       "appointments"."id" AS "appointments_id",
       "appointments"."reason" AS "appointments_reason",
       "appointments"."diagnostic" AS "appointments_diagnostic",
       "appointments"."notes" AS "appointments_notes",
       "athlete"."id" AS "athlete_id",
       "athlete"."name" AS "athlete_name",
       "athlete"."lastName" AS "athlete_lastName",
       "discipline"."name" AS "discipline_name",
       "discipline"."id" AS "discipline_id"
FROM "Users" "user"
LEFT JOIN "Appointments" "appointments" ON "appointments"."created_by"="user"."id"
LEFT JOIN "Athletes" "athlete" ON "athlete"."id"="appointments"."athleteId"
LEFT JOIN "Disciplines" "discipline" ON "discipline"."id"="athlete"."disciplineId"
WHERE "user"."id" =$1
    AND "user"."role" = $2
    AND "user"."isActive" = $3 -- PARAMETERS