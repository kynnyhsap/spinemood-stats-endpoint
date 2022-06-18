import _ from "lodash";
import { format } from "date-fns";

/**
 * Aggregates spinemood records over a date
 *
 * @param records []{ createdAt: Date; }
 * @returns {{date: *, mean: *}[]}
 */
export function getAverageScoreByDate(records = []) {
    return _(records)
        .groupBy((record) => format(record.createdAt, "yyyy-MM-dd"))
        .mapValues((recordsGroup) => _.meanBy(recordsGroup, "score"))
        .map((mean, date) => ({ date, mean }))
        .orderBy([({ date }) => new Date(date)], ["asc"])
        .value();
}