import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";

// PUT update
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const expense = await Expense.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return NextResponse.json(
        { success: false, error: "Expense not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: expense });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const expense = await Expense.findByIdAndDelete(params.id);
    if (!expense) {
      return NextResponse.json(
        { success: false, error: "Expense not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}