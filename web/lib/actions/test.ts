"use server";

export async function testServerAction() {
  console.log(
    "SERVER: testServerAction EXECUTED successfully via Server Action!"
  );
  return { success: true, message: "Server communication is working" };
}
