frappe.ui.form.on('Sales Order', {
    refresh(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    },
    onload(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    }

});

frappe.ui.form.on('Sales Invoice', {
    refresh(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    },
    onload(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    }

});
frappe.ui.form.on('Purchase Order', {
    refresh(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    },
    onload(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    }

});
frappe.ui.form.on('Purchase Invoice', {
    refresh(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    },
    onload(frm) {
        cur_frm.set_query("item_code", "items", function () {
            return {
                query: "volods.volods.item_query.item_search",
                filters: { 'is_sales_item': 1 }
            };
        });
    }

});