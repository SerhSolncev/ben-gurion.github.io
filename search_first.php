<?php
header('Content-Type: application/json');

echo json_encode(array(
    "status" => true,
    "error"  => null,
    "data"   => array(
        "query"   => array(
            "תארים"   => array(
                "הנדסת חשמל ומחשבים","מדעי המחשב","הנדסת מחשבים","מחשבת ישראל"
            ),
            "תחום עניין" => array(
               "מערכות מידע", "חמרה ותוכנה", "מחשבים", "מערכות מידע", "חמרה ותוכנה", "מחשבים"
            )
        )
    )
));
